import mysql from "mysql2/promise";
import connection from "./database.js";

const messageError = "Ha ocurrido un error con tu consulta: ";

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

async function endConnection() {
  if (connection) {
    console.log("Consulta terminada");
    await connection.releaseConnection();
  }
}
