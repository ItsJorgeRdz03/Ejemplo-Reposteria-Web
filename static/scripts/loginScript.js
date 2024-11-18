const errorM = document.querySelector(".error-m p");
const sendBtn = document.getElementById("sendBtn");
const nombre = document.getElementById("nombre");
const apellidoP = document.getElementById("apellidoP");
const apellidoM = document.getElementById("apellidoM");
const tel = document.getElementById("telefono");
const gender = document.getElementById("gender");
const fechaN = document.getElementById("fecha-n");
const email = document.getElementById("correo");
const pass = document.getElementById("password");

function showRegister() {
  document.getElementById("form-title").innerText = "Registrarse";
  document.getElementById("registerFields").style.display = "block";
  document.getElementById("sendBtn").innerText = "Registrarse";
  document.querySelector(".error-m").style.display = "none";
}

function showLogin() {
  document.getElementById("form-title").innerText = "Iniciar Sesión";
  document.getElementById("registerFields").style.display = "none";
  document.getElementById("sendBtn").innerText = "Iniciar Sesión";
  document.querySelector(".error-m").style.display = "none";
}

sendBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  let data;
  let respuestaJson = null;
  if (sendBtn.innerText == "Iniciar Sesión") {
    data = { email: email.value, pass: pass.value };
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    respuestaJson = await res.json();
    await localStorage.setItem("token", respuestaJson[1].token);
    console.log(respuestaJson);
    respuestaJson = respuestaJson[0].res;
    if (respuestaJson == 1) {
      errorM.innerText = "";
      document.querySelector(".error-m").style.display = "none";
      localStorage.setItem("index", "");
      location.href = "/";
    } else {
      errorM.innerText = "Correo y/o contraseña incorrectos.";
      document.querySelector(".error-m").style.display = "block";
      console.log(errorM.innerText);
    }
  } else if (sendBtn.innerText == "Registrarse") {
    data = {
      nombre: nombre.value,
      ap: apellidoP.value,
      am: apellidoM.value,
      tel: tel.value,
      gen: gender.value,
      fecha: fechaN.value,
      email: email.value,
      pass: pass.value,
    };
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    respuestaJson = await res.json();
    console.log(respuestaJson);
    if (respuestaJson[0].res == 1) {
      errorM.innerText = "";
      document.querySelector(".error-m").style.display = "none";
      document.querySelector(".popup").classList.add("show");
      document.body.style.overflow = "hidden";
    } else if (respuestaJson[0].res == 0) {
      errorM.innerText = "Correo ya registrado. Por favor prueva con otro.";
      document.querySelector(".error-m").style.display = "block";
    } else {
      errorM.innerText = "Datos ingresados incorrectos.";
      document.querySelector(".error-m").style.display = "block";
    }
  }
});

document.getElementById("close").addEventListener("click", () => {
  document.querySelector(".popup").classList.remove("show");
  document.body.style.overflow = "visible";
  location.href = "/";
});

showLogin();
