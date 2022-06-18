import { Validator } from "node-input-validator";
import * as employees from "../model/employee.model.js";

const table = "employee_spsi";

export const login = (req, res) => {

    const validator = new Validator(req.body, {
        username: 'required|string',
        password: 'required'
    });

    validator.check().then((matched) => {
        if (!matched) {
          res.status(422).send(validator.errors);
          return;
        } 
            const query = `select * from ${table} where username = '${req.body.username}' and password = '${req.body.password}'`;
            employees.getCustom(query, (err, data) => {
                if (err){
                    res.status(500).send({
                      message:
                        err.message || "Some error occurred while retrieving tutorials."
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
                            message: 'Username and/or password is wrong!'
                        });
                    }
                }
            })
        
      });
}