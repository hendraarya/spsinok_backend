import express, { Express, json, urlencoded } from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { route } from "./route/route.js";

const app: Express = express();
// corsOption ini berfungsi, jika kita inginmembatasi url aplikasi lain yang dapat API kita. Jika ingin semua dapat mengakses , tinggal tidak dipake corsptionnya
// contohnya menggunakan corsoption --> app.use(cors(corsOptions));
// const corsOptions = {
//   origin: "http://localhost:3006",
// hanya localhost:3006 yang dapat mengakses API, jika option diaktifkan
// };

app.use(express.static("public"));
app.use(cors()); // parse requests of content-type - application/json
app.use(json());
app.use(urlencoded({ extended: false })); // parse requests of content-type - application/x-www-form-urlencoded
app.use(fileUpload()); //use library to upload file
app.use(route);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello world." });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
