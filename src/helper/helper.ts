import { Response, Request } from "express";
import { queryCustom } from "../model/model";

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
          message: err.message || "Some error occurred while check employees.",
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
