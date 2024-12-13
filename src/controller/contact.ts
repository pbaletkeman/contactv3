import e, * as express from "express";
import { AppDataSource } from "./../db/data-source";
import { In } from "typeorm";
import bodyParser from "body-parser";

import Router from "express-promise-router";
import { Contact } from "../entity/Contact";
import { Address } from "../entity/Address";

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = express.Router();

// export our router to be mounted by the parent application
export default router;

const contactRepository = AppDataSource.getRepository(Contact);
const addressRepository = AppDataSource.getRepository(Address);

// create application/json parser
var jsonParser = bodyParser.json();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  let ids = id.replace("'", "").split(",");

  res.send(
    await contactRepository.find({
      relations: {
        address: true,
      },
      where: {
        contactId: In(ids),
      },
      order: {
        lastName: "DESC",
      },
    })
  );
});

router.get("/", async (req, res) => {
  res.send(
    await contactRepository.find({
      relations: {
        address: true,
      },
      order: {
        lastName: "DESC",
      },
    })
  );
});

router.post("/", jsonParser, async function (req, res) {
  console.log("POST request received");
  // console.log("Req");
  // console.log(req.body);
  const contact = contactFromJSON(req.body);

  const adds = req.body.addresses
    ? await parseAddressJSON(req.body.addresses, "save")
    : [];

  contact.address = adds;

  const c = await contactRepository.save(contact);
  // console.log(req.body.addresses);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(c));
});

router.put("/", jsonParser, async function (req, res) {
  console.log("PUT request received");
  // console.log("Req");
  // console.log(req.body);
  const contact = contactFromJSON(req.body);

  const adds = req.body.addresses
    ? await parseAddressJSON(req.body.addresses, "update")
    : [];

  contact.address = adds;

  const c = await contactRepository.update(
    { contactId: contact.contactId },
    {
      firstName: contact.firstName,
      lastName: contact.lastName,
      middleName: contact.middleName,
      birthDate: contact.birthDate,
    }
  );

  // this code sets contact of a given address
  await contactRepository
    .createQueryBuilder()
    .relation(Address, "contact")
    .of(adds)
    .set(contact);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(c));
});

function contactFromJSON(body: any) {
  if (!body) {
    return new Contact();
  }
  let contact = new Contact();
  contact.contactId = body.contactId ? body.contactId : null;
  contact.firstName = body.firstName ? body.firstName : null;
  contact.lastName = body.lastName ? body.lastName : null;
  contact.middleName = body.middleName ? body.middleName : null;
  contact.birthDate = body.birthDate ? body.birthDate : null;
  return contact;
}

async function parseAddressJSON(
  body: any,
  action: "save" | "update"
): Promise<Address[]> {
  if (!body) {
    return [new Address()];
  }
  if (Array.isArray(body)) {
    let ads: Address[] = [];
    for (let i = 0; i < body.length; i++) {
      let address = new Address();
      // address.contactId = body.contactid ? body.contactid : null;
      address.addressId = body[i].addressId ? body[i].addressId : null;
      address.street1 = body[i].street1 ? body[i].street1 : null;
      address.street2 = body[i].street2 ? body[i].street2 : null;
      address.city = body[i].city ? body[i].city : null;
      address.province = body[i].province ? body[i].province : null;
      address.postalCode = body[i].postalCode ? body[i].postalCode : null;
      address.country = body[i].country ? body[i].country : null;
      address.phone = body[i].phone ? body[i].phone : null;
      address.email = body[i].email ? body[i].email : null;

      if (action === "update") {
        if (address.addressId && address.addressId != null) {
          await addressRepository.update(
            { addressId: address.addressId },
            {
              street1: address.street1,
              street2: address.street2,
              city: address.city,
              province: address.province,
              postalCode: address.postalCode,
              country: address.country,
              phone: address.phone,
              email: address.email,
            }
          );
        } else {
          await addressRepository.save(address);
        }
      } else {
        await addressRepository.save(address);
      }

      ads.push(address);
    }

    return ads;
  } else {
    let address = new Address();
    // address.contactId = body.contactid ? body.contactid : null;
    address.addressId = body.addressId ? body.addressId : null;
    address.street1 = body.street1 ? body.street1 : null;
    address.street2 = body.street2 ? body.street2 : null;
    address.city = body.city ? body.city : null;
    address.province = body.province ? body.province : null;
    address.postalCode = body.postalCode ? body.postalCode : null;
    address.country = body.country ? body.country : null;
    address.phone = body.phone ? body.phone : null;
    address.email = body.email ? body.email : null;
    await addressRepository.save(address);

    return [address];
  }
}
