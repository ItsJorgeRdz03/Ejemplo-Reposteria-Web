const nombreRegex = new RegExp(
  "^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+(\\s+[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+)+$"
);
const emailRegex = new RegExp("^\\w+@[a-zA-Z_]+?(\\.[a-zA-Z]{2,3}){1,2}$");
var nom = "";
var correo = "";
var data = {
  nombre: "",
  ap: "",
  email: "",
};

async function getProducts() {
  let respuestaJson = null;
  const res = await fetch("/api/bestProducts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  respuestaJson = await res.json();
  respuestaJson = respuestaJson[0];
  console.log(respuestaJson);

  const filas = document.querySelectorAll(".productos-box .producto-item");
  for (let i = 0; i < filas.length; i++) {
    filas[i].querySelector("img").src = respuestaJson[i].img;
    filas[i].querySelector("h3").innerText = respuestaJson[i].nombre;
    filas[i].querySelector("ul").innerText = respuestaJson[i].descr;
  }
}

async function getProductsInfo() {
  let respuestaJson = null;
  const res = await fetch("/api/bestProductsInfo", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  respuestaJson = await res.json();
  respuestaJson = respuestaJson[0];
  console.log(respuestaJson);

  const filas = document.querySelectorAll(".tabla-precios tbody tr");
  for (let i = 0; i < filas.length; i++) {
    const columna = filas[i].querySelectorAll("td");
    let bool = "No";
    if (respuestaJson[i].personalizable == 1) {
      bool = "Sí";
    }
    columna[0].innerText = respuestaJson[i].nombre;
    columna[1].innerText = "$" + respuestaJson[i].precio;
    columna[2].innerText = respuestaJson[i].sabor;
    columna[3].innerText = bool;
  }
}

document.getElementById("resBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  let tNombre = document.getElementById("nombre").value.trim();
  let tEmail = document.getElementById("correo").value.trim();
  checkName(tNombre);
  checkEmail(tEmail);

  if (data.nombre != "" && data.ap != null && data.email != "") {
    let res = await setInfoText();
    console.log(res);
    if (res.res == 1) {
      document.querySelector(".popup").classList.add("show");
      document.body.style.overflow = "hidden";
    } else {
      document.querySelector(".popup-error p").innerText =
        "Este correo ya está registrado, por favor ingresa usa otro.";
      document.querySelector(".popup-error").classList.add("show");
      document.body.style.overflow = "hidden";
    }
  } else {
    document.querySelector(".popup-error p").innerText =
      "Al parecer hubo un error con tus datos, por favor ingresalos correctamente.";
    document.querySelector(".popup-error").classList.add("show");
    document.body.style.overflow = "hidden";
  }
});

document.getElementById("close").addEventListener("click", () => {
  nom = "";
  correo = "";
  data.nombre = "";
  data.ap = "";
  data.email = "";

  document.querySelector(".popup").classList.remove("show");
  document.body.style.overflow = "visible";
});

document.getElementById("close-error").addEventListener("click", () => {
  document.querySelector(".popup-error").classList.remove("show");
  document.body.style.overflow = "visible";
});

function checkName(name) {
  if (name == "") {
    return false;
  } else if (!nombreRegex.test(name)) {
    return false;
  }
  nom = capitlizeText(name);
  data.nombre = getFistName(nom);
  data.ap = getLastName(nom);
  console.log(data.ap);
  return true;
}

function checkEmail(email) {
  if (email == "") {
    return false;
  } else if (!emailRegex.test(email)) {
    return false;
  }
  correo = email;
  data.email = correo;
  return true;
}

function capitlizeText(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word[0].toUpperCase() + word.substr(1);
    })
    .join(" ");
}

function getFistName(name) {
  let nArray = name.split(/(\s+)/);
  return nArray[0];
}

function getLastName(name) {
  let nArray = name.split(/(\s+)/);
  if (nArray[2] != "" || nArray[2] != " ") {
    return nArray[2];
  } else {
    return null;
  }
}

async function setInfoText() {
  document.getElementById("name").innerText = data.nombre;
  document.getElementById("email").innerText = correo;

  let respuestaJson = null;
  const res = await fetch("/api/setSuscripcion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  respuestaJson = await res.json();
  respuestaJson = respuestaJson[0];
  return respuestaJson;
}

getProducts();
getProductsInfo();
