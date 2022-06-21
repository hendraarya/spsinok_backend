type DatabaseConfig = {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: string;
};

export const production: DatabaseConfig = {
  username: "root",
  password: "#NOh4cking",
  database: "causedb",
  host: "localhost",
  dialect: "mysql",
};

export const development: DatabaseConfig = {
  username: "root",
  password: "#NOh4cking",
  database: "spsi_nok",
  host: "localhost",
  dialect: "mysql",
};
