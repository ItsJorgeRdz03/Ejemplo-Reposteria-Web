import express, { text } from "express";
import bcrypt from "bcrypt";
import path from "path";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { servidor, secret, __dirname } from "./data.js";
import {
  getBestProd,
  getBestProdInfo,
  getLogin,
  setSuscripcion,
  setUsuario,
} from "./database.js";
import * as check from "./checkData.js";

const app = express();

app.listen(servidor.SERVER_PORT, () => {
  console.log(`Servidor iniciado con el puerto ${servidor.SERVER_PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(async (req, res, next) => {
  const token = req.cookies.access_token;
  req.session = { id: null, name: null };
  try {
    const data = jwt.verify(token, secret.JWT_SECRET);
    req.session.id = data.id;
    req.session.name = data.nombre;
  } catch (error) {
    console.log(error);
  }
  next();
});
app.use("/img", express.static(path.join(__dirname, "../static/src/imgs")));
app.use("/style", express.static(path.join(__dirname, "../static/styles")));
app.use("/script", express.static(path.join(__dirname, "../static/scripts")));

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "../static/pages/inicio.html"));
});

app.get("/login", async (req, res) => {
  if (req.cookies.access_token) {
    res.sendFile(path.join(__dirname, "../static/pages/estadoLogin.html"));
  } else {
    res.sendFile(path.join(__dirname, "../static/pages/login.html"));
  }
});

app.get("/reservar", async (req, res) => {
  if (req.cookies.access_token) {
    res.sendFile(path.join(__dirname, "../static/pages/productos.html"));
  } else {
    res.sendFile(path.join(__dirname, "../static/pages/estadoLogin.html"));
  }
});

app.get("/soon", async (req, res) => {
  res.sendFile(path.join(__dirname, "../static/pages/construccion.html"));
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
    res.json(data);
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError);
  }
});

app.get("/api/bestProductsInfo", async (req, res) => {
  try {
    const data = await getBestProdInfo();
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

app.post("/api/register", async (req, res) => {
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
    console.log(req.body.fecha);
    console.log(checked);
    if (checked) {
      await bcrypt.hash(body.pass, 10, async function (err, hash) {
        body.pass = hash;
        console.log(body);
        const data = await setUsuario(body);
        console.log(data);
        res.json(data);
      });
    } else {
      console.log(1);
      res.json(err);
    }
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError);
  }
});

app.post("/api/login", async (req, res) => {
  try {
    let response = [{ res: 2 }, { token: null }];
    let checked = true;
    if (!check.checkEmail(req.body.email)) checked = false;
    if (!check.checkPass(req.body.pass)) checked = false;
    if (checked) {
      const data = await getLogin(req.body.email);
      console.log(data);
      let result;
      try {
        result = await bcrypt.compare(req.body.pass, data[0][0].pswd);
      } catch (error) {
        result == false;
      }
      if (result) {
        response[0].res = 1;
        const token = jwt.sign(
          {
            id: data[0][0].pkIdUser,
            nombre: data[0][0].nombre,
          },
          secret.JWT_SECRET,
          { expiresIn: "1h" }
        );
        console.log(response);
        res
          .cookie("access_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          })
          .json(response);
      } else {
        console.log(response);
        response[0].res = 0;
        res.json(response);
      }
    } else {
      res.json(response);
    }
    //console.log(data);
    //res.json(data);
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError);
  }
});

app.post("/api/logout", async (req, res) => {
  res.clearCookie("access_token").json([{ res: 1 }]);
});

app.post("/api/isLogged", async (req, res) => {
  const data = req.cookies.access_token
    ? [{ res: 1, name: req.session.name }]
    : [{ res: 0, name: "" }];
  res.json(data);
});

app.post("/test", async (req, res) => {
  let data = await test();
  console.log(data);
  res.send(data).end;
  data = "";
});

const messageError = "Ha ocurrido un error al procesar tu peticion: ";
