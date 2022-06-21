import { Response, Request } from "express";
import { Validator } from "node-input-validator";
import { queryCustom } from "../model/model";
import * as employees from "../model/employee.model";
import { validatorErrors, checkNik } from "../helper/helper";

const table: string = "employee_spsi";

//get data all employees
export const findAll = (req: Request, res: Response) => {
  employees.getAll((err: any, data: any) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    } else {
      res.send({
        status: "success",
        message: "Success get data employees!",
        data: data,
      });
    }
  });
};

//get data employee by nik
export const findById = (req: Request, res: Response) => {
  const validator = new Validator(req.params, {
    nik: "required|numeric",
  });

  validator.check().then((matched: boolean) => {
    if (!matched) {
      validatorErrors(req, res, validator);
    } else {
      const employee_nik: string = req.params.nik;
      const query: string = `select * from ${table} where employee_nik = '${employee_nik}'`;
      queryCustom(query, (err: any, data: any) => {
        if (err) {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving employees.",
          });
        } else {
          if (data.length !== 0) {
            res.send({
              status: "success",
              message: "Success get data employee!",
              data: data[0],
            });
          } else {
            res.send({
              status: "warning",
              message: `Employee nik ${employee_nik} is not found!`,
            });
          }
        }
      });
    }
  });
};

//add new data employee
export const add = (req: Request, res: Response) => {
  const validator = new Validator(req.body, {
    nik: "required|numeric",
    name: "required|string",
    resign_date: "required|string",
    departement: "required|string",
    section: "required|string",
    gender: "required|string",
    join_date: "required|dateFormat:YYYY-MM-DD",
    group_code: "required|string",
    position: "required|string",
    shift: "required|numeric",
  });

  validator.check().then(async (matched: boolean) => {
    if (!matched) {
      validatorErrors(req, res, validator);
    } else {
      let {
        nik,
        name,
        resign_date,
        departement,
        section,
        gender,
        join_date,
        group_code,
        position,
        shift,
      } = req.body;

      const nikIsExist: any = await checkNik(req, res, nik);

      if (nikIsExist) {
        res.status(409).send({
          status: "warning",
          message: "NIK already used!",
        });
      } else {
        const queryInsert: string = `insert into ${table} (employee_nik, employee_name, resign_date, departement, section, gender, join_date, group_code, employee_position, shift)
        values ('${nik}', '${name}', '${resign_date}', '${departement}', '${section}', '${gender}', '${join_date}', '${group_code}', '${position}', '${shift}')`;
        queryCustom(queryInsert, (err: any, data: any) => {
          if (err) {
            res.status(500).send({
              message:
                err.message || "Some error occurred while add employees.",
            });
          } else {
            res.send({
              status: "success",
              message: "Success add data employee!",
            });
          }
        });
      }
    }
  });
};

//update data employee
export const update = (req: Request, res: Response) => {
  const validator = new Validator(req.body, {
    old_nik: "required|numeric",
    new_nik: "required|numeric",
    name: "required|string",
    resign_date: "required|string",
    departement: "required|string",
    section: "required|string",
    gender: "required|string",
    join_date: "required|dateFormat:YYYY-MM-DD",
    group_code: "required|string",
    position: "required|string",
    shift: "required|numeric",
  });

  validator.check().then(async (matched: boolean) => {
    if (!matched) {
      validatorErrors(req, res, validator);
    } else {
      let {
        old_nik,
        new_nik,
        name,
        resign_date,
        departement,
        section,
        gender,
        join_date,
        group_code,
        position,
        shift,
      } = req.body;

      const oldNikIsAvailable: any = await checkNik(req, res, old_nik);
      const newNikAlreadyUsed: any =
        old_nik === new_nik ? false : await checkNik(req, res, new_nik);

      if (!oldNikIsAvailable) {
        res.status(404).send({
          status: "warning",
          message: `Employee with NIK ${old_nik} not found!`,
        });
      } else if (newNikAlreadyUsed) {
        res.status(409).send({
          status: "warning",
          message: "NIK already used!",
        });
      } else {
        const queryUpdate: string = `update ${table} set employee_nik = '${new_nik}', employee_name = '${name}', resign_date = '${resign_date}', 
        departement = '${departement}', section = '${section}', gender = '${gender}', join_date = '${join_date}', group_code = '${group_code}', 
        employee_position = '${position}', shift = '${shift}' where employee_nik = '${old_nik}'`;
        queryCustom(queryUpdate, (err: any, data: any) => {
          if (err) {
            res.status(500).send({
              message:
                err.message || "Some error occurred while add employees.",
            });
          } else {
            res.send({
              status: "success",
              message: "Success update data employee!",
            });
          }
        });
      }
    }
  });
};

//delete data employee
export const remove = (req: Request, res: Response) => {
  const validator = new Validator(req.params, {
    nik: "required|numeric",
  });

  validator.check().then(async (matched: boolean) => {
    if (!matched) {
      validatorErrors(req, res, validator);
    } else {
      const employee_nik: string = req.params.nik;
      const nikIsAvailable: any = await checkNik(req, res, employee_nik);

      if (!nikIsAvailable) {
        res.status(404).send({
          status: "warning",
          message: `Employee with NIK ${employee_nik} not found!`,
        });
      } else {
        const queryDelete: string = `delete from ${table} where employee_nik = '${employee_nik}'`;
        queryCustom(queryDelete, (err: any, data: any) => {
          if (err) {
            res.status(500).send({
              message:
                err.message || "Some error occurred while add employees.",
            });
          } else {
            res.send({
              status: "success",
              message: "Success delete data employee!",
              deleted: employee_nik,
            });
          }
        });
      }
    }
  });
};
