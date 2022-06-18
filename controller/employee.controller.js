import * as employees from "../model/employee.model.js";

export const findAll = (req, res) => {
    employees.getAll((err, data) => {
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