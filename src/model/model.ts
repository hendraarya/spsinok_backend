import sql from "./db";

export const queryCustom = (customQuery: string, result: any) => {
  sql.query(customQuery, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};
