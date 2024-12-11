import { DataSourceOptions } from "typeorm";
export const baseConfig: DataSourceOptions = {
  synchronize: true, // TODO turn false after initial setup i.e. when moving to migrations
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "pete",
  password: "pete",
  database: "pete",
  entities: ["/src/entity/*.js"],
  migrations: [],
};
