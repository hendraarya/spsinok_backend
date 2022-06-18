import express, { Router } from "express";
import * as auth from "../controller/auth.controller.js";
import * as employees from "../controller/employee.controller.js";

export const route = express();
const router = Router();

router.post("/login", auth.login);
router.get("/employee", employees.findAll);

route.use('/api/', router);
