import sql from "./db";
import knex, { Knex } from "knex";
import { development } from "../config/db.config";

export const queryCustom = (customQuery: string, result: any) => {
  sql.query(customQuery, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};

export const QueryBuilder: Knex = knex({
  client: "mysql",
  connection: {
    host: development.host,
    port: development.port,
    user: development.username,
    password: development.password,
    database: development.database,
  },
});
