import express = require("express");
import { AppDataSource } from "./db/data-source";

import mountRoutes from "./controller";
import { Contact } from "./entity/Contact";
import { Address } from "./entity/Address";

const app = express();
const port = 4000;

// https://typeorm.io/

AppDataSource.initialize()
  .then(async () => {
    // console.log("Inserting a new user into the database...");
    // const contact = new Contact();
    // contact.firstName = "Timber";
    // contact.lastName = "Saw";
    // contact.birthDate = new Date();
    // await AppDataSource.manager.save(contact);
    // console.log("Saved a new user with id: " + contact.contactId);

    // console.log("Loading users from the database...");
    // const users = await AppDataSource.manager.find(Contact);
    // console.log("Loaded users: ", users);

    // console.log(
    //   "Here you can setup and run express / fastify / any other framework."
    // );

    mountRoutes(app);
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
