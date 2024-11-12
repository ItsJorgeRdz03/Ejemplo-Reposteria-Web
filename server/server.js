import express, { text } from "express";
import bcrypt from "bcrypt";
import path from "path";
import { servidor, __dirname } from "./data.js";
import {
  getBestProd,
  getBestProdInfo,
  getLogin,
  setSuscripcion,
} from "./database.js";
import * as check from "./checkData.js";

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

app.get("/reservar", async (req, res) => {
  res.sendFile(path.join(__dirname, "../static/pages/productos.html"));
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
  console.log(req.body);
  try {
    let err = [{ res: 2 }];
    let values = {
      nombre: "",
      ap: "",
      email: "",
    };
    let nom = check.checkName(req.body.name) == true ? req.body.name : "";
    if (nom != "") {
      nom = check.capitlizeText(nom);
      values.nombre = check.getFistName(nom);
      values.ap = check.getLastName(nom);
      values.email =
        check.checkEmail(req.body.email) == true ? req.body.email : "";
    } else {
      res.json(err);
      return;
    }

    if (values.nombre != "" && values.ap != "" && values.email != "") {
      console.log(values);
      const data = await setSuscripcion(values);
      console.log(data);
      res.json(data);
    } else {
      res.json(err);
    }
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError);
  }
});

app.post("/api/setUsuario", async (req, res) => {
  try {
    let err = [{ res: 2 }];
    let body = req.body;
    let checked = true;
    if (!check.checkEmail(req.body.email)) checked = false;
    if (!check.checkName(req.body.nombre)) checked = false;
    if (!check.checkNomComp(req.body.ap)) checked = false;
    if (!check.checkNomComp(req.body.am)) checked = false;
    if (!check.checkTel(req.body.tel)) checked = false;
    if (!check.checkGen(req.body.gen)) checked = false;
    if (!check.checkDate(req.body.fecha)) checked = false;
    if (!check.checkPass(req.body.pass)) checked = false;
    if (checked) {
      await bcrypt.hash(body.pass, 10, async function (err, hash) {
        body.pass = hash;
        console.log(body);
        console.log(0);
        const data = await setSuscripcion(body);
        res.json(data);
      });
    } else {
      console.log(1);
      res.json(err);
    }
    //console.log(data);
    //res.json(data);
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError);
  }
});

app.post("/api/setLogin", async (req, res) => {
  try {
    let err = [{ res: 2 }];
    let checked = true;
    if (!check.checkEmail(req.body.email)) checked = false;
    if (!check.checkPass(req.body.pass)) checked = false;
    if (checked) {
      const data = await getLogin(req.body.email);
      console.log(data);
      let result;
      try {
        result = await bcrypt.compare(req.body.pass, data[0].pswd);
      } catch (error) {
        result == false;
      }
      err[0].res = result == true ? 1 : 0;
      res.json(err);
    } else {
      res.json(err);
    }
    //console.log(data);
    //res.json(data);
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
