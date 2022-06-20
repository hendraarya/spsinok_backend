import sql from "./db.js";

export const getCustom = (customQuery, result) => {
    sql.query(customQuery, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        result(null, res);
      });
}

export const getAll = (result) => {
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
