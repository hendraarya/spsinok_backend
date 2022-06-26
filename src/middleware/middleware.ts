import moment from "moment-timezone";
import { QueryBuilder } from "../model/model";
import { updateSessionLifetime } from "../helper/helper";

export const tokenVerify = async (req: any, res: any, next: any) => {
  const token: string = req.headers["x-access-token"];
  const table: string = "session_spsi";

  if (!token) {
    return res.status(403).send({
      status: "warning",
      message: "No token provided!",
    });
  }

  await QueryBuilder(table)
    .where({ session_token: token })
    .first()
    .select("*")
    .then(async (result: any) => {
      if (result) {
        const isExpired: boolean = moment(new Date()).isAfter(
          moment(result.session_expired).format("YYYY-MM-DD HH:mm:ss")
        )
          ? true
          : false;

        if (isExpired) {
          return res.status(403).send({
            status: "warning",
            message: "Your session is expired, please login again!",
          });
        } else {
          updateSessionLifetime(req, res, token);
          next();
        }
      } else {
        return res.status(403).send({
          status: "warning",
          message: "Login first!",
        });
      }
    });
};
