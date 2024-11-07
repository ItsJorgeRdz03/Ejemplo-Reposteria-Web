import express, { text } from "express";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
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

const app = express();

app.listen(servidor.SERVER_PORT, () => {
  console.log(
    `Servidor iniciado con el puerto ${process.env.SERVER_PORT} ${conexionDB.HOST}`
  );
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/img", express.static(path.join(__dirname, "../static/src/imgs")));
app.use("/style", express.static(path.join(__dirname, "../static/styles")));
app.use("/script", express.static(path.join(__dirname, "../static/scripts")));

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "../static/pages/inicio.html"));
});

app.get("/login", async (req, res) => {
  res.sendFile(path.join(__dirname, "../static/pages/login.html"));
});

app.get("/img", async (req, res) => {
  res.sendFile(path.join(__dirname, "../static/src/imgs"));
});

/*app.post("/lexer", async (req, res) => {
  let data = await lexer.analizar(req.body.string);
  console.log(data);
  res.send(data).end;
  data = "";
});

app.post("/parser", async (req, res) => {
  if (req.body.string === "") {
    res.send("").end;
  }
  let data = await parser.analizar(req.body.string);
  console.log(data);
  res.send(data).end;
});*/
