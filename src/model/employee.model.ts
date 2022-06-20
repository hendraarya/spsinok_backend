import sql from "./db";

export const getCustom = (customQuery: string, result: any) => {
  sql.query(customQuery, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

export const getAll = (result: any) => {
  let query = "select * from employee_spsi";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};
