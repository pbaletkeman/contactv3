import { Address } from "./entity/Address";
import { Contact } from "./entity/Contact";

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
  // contact.addresses = body.addresses ? parseAddressJSON(body.addresses) : null;
  return contact;
}

function parseAddressJSON(addresses: any) {
  let adds = [];
  if (addresses && Array.isArray(addresses) && addresses.length > 0) {
    addresses.forEach((a) => {
      const address = addressFromJSON(a);
      adds.push(address);
    });
  }
  return adds;
}

function addressFromJSON(body: any) {
  if (!body) {
    return new Address();
  }

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
  return address;
}
