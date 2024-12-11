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
      select: {
        contactId: true,
        firstName: true,
        lastName: true,
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
      select: {
        contactId: true,
        firstName: true,
        lastName: true,
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
    ? await parseAddressJSON(req.body.addresses)
    : [];

  contact.address = adds;

  const c = await contactRepository.save(contact);
  // console.log(req.body.addresses);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(c));
});

router.put("/", jsonParser, async function (req, res) {
  console.log("PUTT request received");
  // console.log("Req");
  // console.log(req.body);
  const contact = contactFromJSON(req.body);

  const adds = req.body.addresses
    ? await parseAddressJSON(req.body.addresses)
    : [];

  contact.address = adds;

  const c = await contactRepository.save(contact);
  // console.log(req.body.addresses);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(c));
});

function contactFromJSON(body: any) {
  if (!body) {
    return new Contact();
  }
  let contact = new Contact();
  contact.contactId = body.contactid ? body.contactid : null;
  contact.firstName = body.firstname ? body.firstname : null;
  contact.lastName = body.lastname ? body.lastname : null;
  contact.middleName = body.middlename ? body.middlename : null;
  contact.birthDate = body.birthdate ? body.birthdate : null;
  return contact;
}

async function parseAddressJSON(body: any): Promise<Address[]> {
  if (!body) {
    return [new Address()];
  }
  if (Array.isArray(body)) {
    let ads: Address[] = [];
    for (let i = 0; i < body.length; i++) {
      let address = new Address();
      // address.contactId = body.contactid ? body.contactid : null;
      address.addressId = body[i].addressid ? body[i].addressid : null;
      address.street1 = body[i].street1 ? body[i].street1 : null;
      address.street2 = body[i].street2 ? body[i].street2 : null;
      address.city = body[i].city ? body[i].city : null;
      address.province = body[i].province ? body[i].province : null;
      address.postalCode = body[i].postalcode ? body[i].postalcode : null;
      address.country = body[i].country ? body[i].country : null;
      address.phone = body[i].phone ? body[i].phone : null;
      address.email = body[i].email ? body[i].email : null;

      await addressRepository.save(address);

      ads.push(address);
    }
    return ads;
  } else {
    let address = new Address();
    // address.contactId = body.contactid ? body.contactid : null;
    address.addressId = body.addressid ? body.addressid : null;
    address.street1 = body.street1 ? body.street1 : null;
    address.street2 = body.street2 ? body.street2 : null;
    address.city = body.city ? body.city : null;
    address.province = body.province ? body.province : null;
    address.postalCode = body.postalcode ? body.postalcode : null;
    address.country = body.country ? body.country : null;
    address.phone = body.phone ? body.phone : null;
    address.email = body.email ? body.email : null;
    await addressRepository.save(address);

    return [address];
  }
}
