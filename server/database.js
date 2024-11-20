import mysql from "mysql2/promise";
import { conexionDB } from "./data.js";

const messageError = "Ha ocurrido un error con tu consulta: ";

const connection = mysql.createPool({
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

async function endConnection() {
  if (connection) {
    console.log("Consulta terminada");
    await connection.releaseConnection();
  }
}

export async function getAllProd() {
  try {
    console.log("Consulta iniciada");
    let query = "CALL getAllProducts();";
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos resultados
    endConnection();
    return rows; // Retornamos las filas afectadas
  } catch (err) {
    console.error(messageError, err);
  }
}

export async function getBestProd() {
  try {
    console.log("Consulta iniciada");
    let query = "CALL getBestProducts();";
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos resultados
    endConnection();
    return rows; // Retornamos las filas afectadas
  } catch (err) {
    console.error(messageError, err);
  }
}

export async function getBestProdInfo() {
  try {
    console.log("Consulta iniciada");
    let query = "CALL getBestProductsInfo();";
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos resultados
    endConnection();
    return rows; // Retornamos las filas afectadas
  } catch (err) {
    console.error(messageError, err);
  }
}

export async function setSuscripcion(data) {
  try {
    console.log("Consulta iniciada");
    let query = `SELECT setSuscripcion("${data.nombre}", "${data.ap}", "${data.email}") as res;`;
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos resultados
    endConnection();
    return rows; // Retornamos las filas afectadas
  } catch (err) {
    console.error(messageError, err);
  }
}

export async function setUsuario(data) {
  try {
    console.log("Consulta iniciada");
    let query = `SELECT setUsuario("${data.nombre}", "${data.ap}", "${data.am}", "${data.tel}", "${data.gen}", "${data.fecha}", "${data.email}", "${data.pass}") as res;`;
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos resultados
    endConnection();
    return rows; // Retornamos las filas afectadas
  } catch (err) {
    console.error(messageError, err);
  }
}

export async function setReservacion(data) {
  try {
    console.log("Consulta iniciada");
    console.log(data.pedidos);
    let query = `CALL setReservaciones('${JSON.stringify(data.pedidos)}', "${
      data.fecha
    }", "${data.hora}", ${data.idUser});`;
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos resultados
    endConnection();
    return rows; // Retornamos las filas afectadas
  } catch (err) {
    console.error(messageError, err);
  }
}

export async function getLogin(data) {
  try {
    console.log("Consulta iniciada");
    let query = `CALL getPassword("${data}");`;
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos resultados
    endConnection();
    return rows; // Retornamos las filas afectadas
  } catch (err) {
    console.error(messageError, err);
  }
}

export async function test() {
  try {
    console.log("Consulta iniciada");
    let query = "SELECT * FROM producto";
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos resultados
    endConnection();
    return rows; // Retornamos las filas afectadas
  } catch (err) {
    console.error(messageError, err);
  }
}
