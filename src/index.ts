import express, { Express, json, urlencoded } from "express";
import cors from "cors";
import { route } from "./route/route.js";

const app: Express = express();
const corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));
app.use(route);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello world." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
