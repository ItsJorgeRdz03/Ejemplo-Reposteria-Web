const nombreRegex = new RegExp(
  "^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+(\\s+[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+)+$"
);
const emailRegex = new RegExp("^\\w+@[a-zA-Z_]+?(\\.[a-zA-Z]{2,3}){1,2}$");

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
  let data = {
    name: tNombre,
    email: tEmail,
  };
  let res = await setInfoText(data);
  console.log(res);
  if (res == 1) {
    document.querySelector(".popup").classList.add("show");
    document.body.style.overflow = "hidden";
  } else if (res == 0) {
    document.querySelector(".popup-error p").innerText =
      "Este correo ya está registrado, por favor ingresa usa otro.";
    document.querySelector(".popup-error").classList.add("show");
    document.body.style.overflow = "hidden";
  } else if (res == 2) {
    document.querySelector(".popup-error p").innerText =
      "Al parecer hubo un error con tus datos, por favor ingresalos correctamente.";
    document.querySelector(".popup-error").classList.add("show");
    document.body.style.overflow = "hidden";
  }
});

document.getElementById("close").addEventListener("click", () => {
  document.querySelector(".popup").classList.remove("show");
  document.body.style.overflow = "visible";
});

document.getElementById("close-error").addEventListener("click", () => {
  document.querySelector(".popup-error").classList.remove("show");
  document.body.style.overflow = "visible";
});

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

async function setInfoText(data) {
  document.getElementById("name").innerText = getFistName(
    capitlizeText(data.name)
  );
  document.getElementById("email").innerText = data.email;

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
  console.log(respuestaJson);
  return respuestaJson.res;
}

getProducts();
getProductsInfo();
