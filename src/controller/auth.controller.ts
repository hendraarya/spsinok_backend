import { Response, Request } from "express";
import { Validator } from "node-input-validator";
import moment from "moment-timezone";
import { QueryBuilder } from "../model/model";
import { addSession } from "../helper/helper";

const table = "user_spsi";
const bcrypt = require("bcrypt");

export const login = (req: Request, res: Response) => {
  const validator = new Validator(req.body, {
    username: "required|string",
    password: "required",
  });

  validator.check().then((matched: any) => {
    if (!matched) {
      res.status(422).send(validator.errors);
      return;
    }

    QueryBuilder(table)
      .where({ username: req.body.username, password: req.body.password })
      .first()
      .select("*")
      .then(async (result: any) => {
        if (result) {
          const stringToHash = `${result.username}.${result.level}`;
          let token: string = "";

          await bcrypt.hash(stringToHash, 10).then((hash: any) => {
            token = hash;
          });

          const dataToInsert = {
            alias: result.username,
            level: "user",
            token: token,
            expired: moment(new Date())
              .add(30, "m")
              .format("YYYY-MM-DD HH:mm:ss"),
            address: "-",
            create: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            update: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          };

          addSession(req, res, dataToInsert);
          return res.send({
            status: "success",
            message: "Success login!",
            token: token,
          });
        }
      })
      .catch((err: any) => {
        return res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving employees.",
        });
      });
  });
};
