import * as mysql from "mysql2";
import "./dotenv.config";

const connection = mysql.createConnection({
  host: process.env.TYPEORM_HOST,
  user: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  port: parseInt(process.env.TYPEORM_PORT),
  charset: "utf8mb4_general_ci"
});

connection.connect();
connection.query(
  `CREATE DATABASE IF NOT EXISTS ${process.env.TYPEORM_DATABASE}`,
  (err) => {
    err ? console.log(err) : console.log("DB Created!");
    connection.end();
  }
);
