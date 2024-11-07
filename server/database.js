import mysql from "mysql2/promise";
import { conexionDB } from "./data.js";

const messageError = "Ha ocurrido un error con tu consulta: ";

export const connection = mysql.createPool({
  host: conexionDB.HOST,
  user: conexionDB.USER,
  password: conexionDB.PASSWORD,
  database: conexionDB.DATABASE,
  port: conexionDB.PORT,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
});

export default connection;
