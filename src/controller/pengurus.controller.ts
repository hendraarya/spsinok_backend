import { Request, Response } from 'express';
import { queryCustom } from "../model/model";

export const pengurusnow = async (req: Request, res: Response) => {
  const queryCheck: string = `select b.id_priode, a.employee_nik, a.employee_name, a.profile_picture, a.join_date, a.gender    from employee_spsi a INNER JOIN management_spsi b  ON a.employee_nik = b.ketum_nik UNION 
select b.id_priode, a.employee_nik, a.employee_name, a.profile_picture, a.join_date, a.gender  from employee_spsi a INNER JOIN  management_spsi b  ON a.employee_nik = b.sekjen_nik UNION 
select b.id_priode, a.employee_nik, a.employee_name, a.profile_picture, a.join_date, a.gender  from employee_spsi a INNER JOIN  management_spsi b  ON a.employee_nik = b.wakilketum1_nik UNION 
select b.id_priode, a.employee_nik, a.employee_name, a.profile_picture, a.join_date, a.gender  from employee_spsi a INNER JOIN  management_spsi b  ON a.employee_nik = b.wakilsek1_nik UNION 
select b.id_priode, a.employee_nik, a.employee_name, a.profile_picture, a.join_date, a.gender  from employee_spsi a INNER JOIN  management_spsi b  ON a.employee_nik = b.wakilketum2_nik  UNION 
select b.id_priode, a.employee_nik, a.employee_name, a.profile_picture, a.join_date, a.gender  from employee_spsi a INNER JOIN  management_spsi b  ON a.employee_nik = b.wakilsek2_nik UNION
select b.id_priode, a.employee_nik, a.employee_name, a.profile_picture, a.join_date, a.gender  from employee_spsi a INNER JOIN  management_spsi b  ON a.employee_nik = b.wakilketum3_nik  UNION 
select b.id_priode, a.employee_nik, a.employee_name, a.profile_picture, a.join_date, a.gender  from employee_spsi a INNER JOIN  management_spsi b  ON a.employee_nik = b.wakilsek3_nik UNION 
select b.id_priode, a.employee_nik, a.employee_name, a.profile_picture, a.join_date, a.gender  from employee_spsi a INNER JOIN  management_spsi b  ON a.employee_nik = b.wakilketum4_nik  UNION 
select b.id_priode, a.employee_nik, a.employee_name, a.profile_picture, a.join_date, a.gender  from employee_spsi a INNER JOIN  management_spsi b  ON a.employee_nik = b.bendahara_nik  UNION 
select b.id_priode, a.employee_nik, a.employee_name, a.profile_picture, a.join_date, a.gender  from employee_spsi a INNER JOIN  management_spsi b  ON a.employee_nik = b.wakilbend_nik;`;
  queryCustom(queryCheck, (err: any, data: any) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while check nik.",
      });
    } else {
      return res.send({
        status: "success",
        message: "Success get Management SPSI Priode Now !",
        data: data,
      });
    }
  });
}
