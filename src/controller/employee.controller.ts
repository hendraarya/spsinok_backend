import { Response, Request } from "express";
import { Validator } from "node-input-validator";
import { validatorErrors, checkNik } from "../helper/helper";
import { QueryBuilder } from "../model/model";
import appRoot  from 'app-root-path';
import moment from "moment";

const table: string = "employee_spsi";
const column: Array<string> = [
  "employee_nik",
  "employee_name",
  "resign_date",
  "departement",
  "section",
  "gender",
  "join_date",
  "group_code",
  "employee_position",
  "shift",
];

//get data all employees
export const findAll = async (req: Request, res: Response) => {
  await QueryBuilder.select(column)
    .table(table)
    .then((result: any) => {
      return res.send({
        status: "success",
        message: "Success get data employees!",
        data: result,
      });
    })
    .catch((err: any) => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

//get data employee by nik
export const findById = async (req: Request, res: Response) => {
  const validator = new Validator(req.params, {
    nik: "required|numeric",
  });

  validator.check().then(async (matched: boolean) => {
    if (!matched) {
      validatorErrors(req, res, validator);
    } else {
      const nik: string = req.params.nik;
      await QueryBuilder(table)
        .where({ employee_nik: nik })
        .first()
        .select(column)
        .then((result: any) => {
          if (result) {
            res.send({
              status: "success",
              message: "Success get data employee!",
              data: result,
            });
          } else {
            res.send({
              status: "warning",
              message: `Employee with nik ${nik} is not found!`,
            });
          }
        })
        .catch((err: any) => {
          return res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving employees.",
          });
        });
    }
  });
};

//add new data employee
export const add = (req: Request, res: Response) => {

  //merge req file upload with req body to validate
  for (const key in req.files) {
    req.body[key] = req.files[key];
  }

  const validator = new Validator(req.body, {
    nik: "required|numeric",
    name: "required|string",
    picture: 'required|mime:jpg,png|size:2mb',
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
        return res.status(409).send({
          status: "warning",
          message: "NIK already used!",
        });
      } else {
        const fileName: string = `profile_${nik}_${moment().unix()}.${req.body.picture.name.split('.')[1]}`;
        const uploadPath: string = `${appRoot.path}/public/images/profiles/`;
        const uploadPicture: any = req.body.picture;
        const upload: any = await new Promise((resolve) => {
          uploadPicture.mv(`${uploadPath}${fileName}`, (err: any) =>  {
            if (err) {
              return res.status(500).send({
                message:
                  err.message || "Some error occurred while upload file.",
              });
            }
            resolve(true)
          })
        }) 

        if (upload) {
          const coloumnToInsert = {
            employee_nik: nik,
            employee_name: name,
            profile_picture: `http://${req.headers.host}/images/profiles/${fileName}`,
            resign_date: resign_date,
            departement: departement,
            section: section,
            gender: gender,
            join_date: join_date,
            group_code: group_code,
            employee_position: position,
            shift: shift,
            created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            updated_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          };
          QueryBuilder(table)
            .insert(coloumnToInsert)
            .then((result: any) => {
              return res.send({
                status: "success",
                message: "Success add data employee!",
              });
            })
            .catch((err: any) => {
              return res.status(500).send({
                message:
                  err.message || "Some error occurred while add employees.",
              });
            });
        }
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
        return res.status(404).send({
          status: "warning",
          message: `Employee with NIK ${old_nik} not found!`,
        });
      } else if (newNikAlreadyUsed) {
        return res.status(409).send({
          status: "warning",
          message: "NIK already used!",
        });
      } else {
        const coloumnToUpdate = {
          employee_nik: new_nik,
          employee_name: name,
          resign_date: resign_date,
          departement: departement,
          section: section,
          gender: gender,
          join_date: join_date,
          group_code: group_code,
          employee_position: position,
          shift: shift,
          updated_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        };
        QueryBuilder(table)
          .where({ employee_nik: old_nik })
          .update(coloumnToUpdate)
          .then((result: any) => {
            return res.send({
              status: "success",
              message: "Success update data employee!",
            });
          })
          .catch((err: any) => {
            return res.status(500).send({
              message:
                err.message || "Some error occurred while add employees.",
            });
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
      const nik: string = req.params.nik;
      const nikIsAvailable: any = await checkNik(req, res, nik);

      if (!nikIsAvailable) {
        return res.status(404).send({
          status: "warning",
          message: `Employee with NIK ${nik} not found!`,
        });
      } else {
        QueryBuilder(table)
          .where({ employee_nik: nik })
          .del()
          .then((result: any) => {
            res.send({
              status: "success",
              message: "Success delete data employee!",
              deleted: nik,
            });
          })
          .catch((err: any) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while add employees.",
            });
          });
      }
    }
  });
};
