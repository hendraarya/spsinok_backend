import { createConnection } from "mysql";
import { development } from "../config/db.config";
// Create a connection to the database
const connection = createConnection({
  host: development.host,
  user: development.username,
  password: development.password,
  database: development.database,
});
// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

export default connection;
