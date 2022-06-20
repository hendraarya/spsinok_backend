import { Response, Request } from "express";
import { Validator } from "node-input-validator";
import * as employees from "../model/employee.model.js";

const table = "employee_spsi";

export const findAll = (req: Request, res: Response) => {
    employees.getAll((err: any, data: any) => {
        if (err){
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving tutorials."
            });
        } else {
            res.send({
                status: 'success',
                message: 'Success get data employees!',
                data: data
            });
        }
    })
}

export const findById = (req: Request, res: Response) => {

    const validator = new Validator(req.params, {
        employee_number: 'required|numeric',
    });

    validator.check().then((matched: any) => {
        if (!matched) {
          res.status(422).send(validator.errors);
          return;
        } else {
            const employee_no = req.params.employee_number;
            const query = `select * from ${table} where employee_no = '${employee_no}'`;
            employees.getCustom(query, (err: any, data: any) => {
                if (err){
                    res.status(500).send({
                      message:
                        err.message || "Some error occurred while retrieving employees."
                    });
                } else {
                    if (data.length !== 0) {
                        res.send({
                            status: 'success',
                            message: 'Success get data employee!',
                            data: data[0]
                        });
                    } else {
                        res.send({
                            status: 'warning',
                            message: `Employee number ${employee_no} is not found!`
                        });
                    }
                }
            })
        }
    })

}