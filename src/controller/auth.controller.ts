import { Response, Request } from "express";
import { Validator } from "node-input-validator";
import * as employees from "../model/employee.model";

const table = "employee_spsi";

export const login = (req: Request, res: Response) => {

    const validator = new Validator(req.body, {
        employee_number: 'required|numeric',
        password: 'required'
    });

    validator.check().then((matched: any) => {
        if (!matched) {
          res.status(422).send(validator.errors);
          return;
        } 
            const query: string = `select * from ${table} where employee_no = '${req.body.employee_no}' and password = '${req.body.password}'`;
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
                            message: 'Success login!'
                        });
                    } else {
                        res.send({
                            status: 'warning',
                            message: 'Employee number and/or password is wrong!'
                        });
                    }
                }
            })
        
      });
}