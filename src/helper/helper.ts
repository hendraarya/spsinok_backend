import { Response, Request } from "express";
import { queryCustom } from "../model/model";
import { QueryBuilder } from "../model/model";
import moment from "moment";

const table: any = {
  session_spsi: "session_spsi",
};

export const validatorErrors = (
  req: Request,
  res: Response,
  validator: any
) => {
  let error_message: Array<string> = [];
  for (const key of Object.keys(validator.errors)) {
    error_message.push(validator.errors[key].message);
  }

  res.status(422).send({
    status: "warning",
    error_message: error_message,
  });
};

export const checkNik = (req: Request, res: Response, nik: string) => {
  return new Promise((resolve) => {
    const queryCheck: string = `select * from employee_spsi where employee_nik = '${nik}'`;
    queryCustom(queryCheck, (err: any, data: any) => {
      if (err) {
        return res.status(500).send({
          message: err.message || "Some error occurred while check nik.",
        });
      } else {
        if (data.length !== 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  });
};

export const addSession = (req: Request, res: Response, dataToInsert: any) => {
  const { alias, level, token, expired, address, create, update } =
    dataToInsert;
  const coloumnToInsert = {
    session_alias: alias,
    session_level: level,
    session_token: token,
    session_expired: expired,
    session_address: address,
    session_createat: create,
    session_updateat: update,
  };

  QueryBuilder(table.session_spsi)
    .insert(coloumnToInsert)
    .then((result: any) => {
      //do nothing
    })
    .catch((err: any) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while add session.",
      });
    });
};

export const updateSessionLifetime = (
  req: Request,
  res: Response,
  token: string
) => {
  return new Promise((resolve) => {
    const expired: any = moment(new Date())
      .add(30, "m")
      .format("YYYY-MM-DD HH:mm:ss");
    QueryBuilder(table.session_spsi)
      .where("session_token", token)
      .update({ session_expired: expired })
      .then((result: any) => {
        resolve(true);
      })
      .catch((err: any) => {
        return res.status(500).send({
          message: err.message || "Some error occurred while update lifetime.",
        });
      });
  });
};
