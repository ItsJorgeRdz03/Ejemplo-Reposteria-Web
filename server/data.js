import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: __dirname + "/.env" });

// Configuracion de la base de datos
export const conexionDB = {
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  DATABASE: process.env.DB_NAME,
  PASSWORD: process.env.DB_PASSWORD,
  USER: process.env.DB_USER,
};

// Configuracion del servidor
export const servidor = {
  SERVER_HOST: process.env.SERVER_HOST,
  SERVER_PORT: process.env.SERVER_PORT,
};

// SECRET
export const secret = {
  JWT_SECRET: process.env.JWT_SECRET,
};
