import express, { text } from "express";
import path from "path";
import { servidor, __dirname } from "./data.js";
import { getBestProd, getBestProdInfo, setSuscripcion } from "./database.js";

const app = express();

app.listen(servidor.SERVER_PORT, () => {
  console.log(`Servidor iniciado con el puerto ${servidor.SERVER_PORT}`);
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

app.get("/api/admin", async (req, res) => {
  res.send("Funcionando");
});

app.get("/api/bestProducts", async (req, res) => {
  try {
    const data = await getBestProd();
    //console.log(data);
    res.json(data);
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError);
  }
});

app.get("/api/bestProductsInfo", async (req, res) => {
  try {
    const data = await getBestProdInfo();
    //console.log(data);
    res.json(data);
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError);
  }
});

app.post("/api/setSuscripcion", async (req, res) => {
  try {
    //console.log(req.body);
    const data = await setSuscripcion(req.body);
    console.log(data);
    res.json(data);
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError);
  }
});

app.post("/test", async (req, res) => {
  let data = await test();
  console.log(data);
  res.send(data).end;
  data = "";
});

const messageError = "Ha ocurrido un error al procesar tu peticion: ";

/*app.post("/parser", async (req, res) => {
  if (req.body.string === "") {
    res.send("").end;
  }
  let data = await parser.analizar(req.body.string);
  console.log(data);
  res.send(data).end;
});*/
