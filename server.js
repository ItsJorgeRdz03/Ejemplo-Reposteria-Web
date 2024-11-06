import express, { text } from "express";
import { fileURLToPath } from "url";
import path from "path";
//import * as lexer from "./lexer.js";
//import * as parser from "./parser.js";
const connectionData = {
  port: 80,
};
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.listen(connectionData.port, () => {
  console.log(
    `Servidor iniciado con el puerto ${connectionData.port} ${__dirname}`
  );
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/img", express.static(__dirname + "/static/src/imgs"));
app.use("/style", express.static(__dirname + "/static/styles"));
app.use("/script", express.static(__dirname + "/static/scripts"));

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/static/pages/inicio.html");
});

app.get("/login", async (req, res) => {
  res.sendFile(__dirname + "/static/pages/login.html");
});

app.get("/img", async (req, res) => {
  res.sendFile(__dirname + "/static/src/imgs");
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
