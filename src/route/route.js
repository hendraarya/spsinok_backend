import express, { Router } from "express";
import * as auth from "../controller/auth.controller.js";
import * as employee from "../controller/employee.controller.js";
import * as middleware from "../middleware/middleware.js";

export const route = express();
const router = Router();

router.post("/login", auth.login);

const employeeMiddleware = [middleware.jwtVerify];
router.get("/employees", employeeMiddleware, employee.findAll);
router.get("/employee/:employee_number", employeeMiddleware, employee.findById);

route.use("/api/", router);
route.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Route not found!",
  });
});
