import express, { Express, Router, Response, Request } from "express";
import * as auth from "../controller/auth.controller.js";
import * as employee from "../controller/employee.controller.js";
import * as document from "../controller/document.controller.js";
import * as middleware from "../middleware/middleware.js";

export const route: Express = express();
const router = Router();

router.post("/login", auth.login);
router.get("/employees", employee.findAll);
router.get("/document", document.findDocument);
const employeeMiddleware = [middleware.tokenVerify];
// router.get("/employees", employeeMiddleware, employee.findAll);
router.get("/employee/:nik", employeeMiddleware, employee.findById);
router.post("/employee", employeeMiddleware, employee.add);
router.put("/employee", employeeMiddleware, employee.update);
router.delete("/employee/:nik", employeeMiddleware, employee.remove);

route.use("/api/", router);
router.get("/images/profiles", (req, res) => {
  res.sendFile("assets/profiles/profile_4455_1656338386.jpg");
});
route.use((req: Request, res: Response) => {
  res.status(404).send({
    status: "error",
    message: "Route not found!",
  });
});
