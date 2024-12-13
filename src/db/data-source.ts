import "reflect-metadata";
import { DataSource } from "typeorm";
import { Contact } from "../entity/Contact";
import { Address } from "../entity/Address";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "pete",
  password: "pete",
  database: "pete",
  synchronize: true,
  entities: [Address, Contact],
  migrations: [],
  subscribers: [],
  // logging: ["query"],
});
