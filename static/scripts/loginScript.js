//const tabs = document.querySelector(".toggle-buttons a");
//const loginTab = document.getElementById("loginBtn");
//const registerTab = document.getElementById("registerBtn");
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
}

function showLogin() {
  document.getElementById("form-title").innerText = "Iniciar Sesión";
  document.getElementById("registerFields").style.display = "none";
  document.getElementById("sendBtn").innerText = "Iniciar Sesión";
}

sendBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  let data;
  let respuestaJson = null;
  if (sendBtn.innerText == "Iniciar Sesión") {
    data = { email: email.value, pass: pass.value };
    const res = await fetch("/api/setLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    respuestaJson = await res.json();
    respuestaJson = respuestaJson[0].res;
    console.log(respuestaJson);
    if (respuestaJson == 1) {
      errorM.innerText = "";
      document.querySelector(".error-m").classList.remove("show");
      location.href = "/";
    } else {
      errorM.innerText = "Correo y/o contraseña incorrectos.";
      document.querySelector(".error-m").classList.add("show");
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
    const res = await fetch("/api/setUsuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    respuestaJson = await res.json();
    //respuestaJson = respuestaJson[0].res;
    console.log(respuestaJson);
    if (respuestaJson[0].res == 1) {
      console.log(1);
      errorM.innerText = "";
      errorM.style.display = "none";
      document.querySelector(".error-m").classList.remove("show");
      document.querySelector(".popup").classList.add("show");
      document.body.style.overflow = "hidden";
    } else if (respuestaJson[0].res == 0) {
      console.log(0);
      errorM.innerText = "Correo ya registrado. Por favor prueva con otro.";
      document.querySelector(".error-m").classList.add("show");
    } else {
      console.log(2);
      errorM.innerText = "Datos ingresados incorrectos.";
      document.querySelector(".error-m").classList.add("show");
    }
  }
});

document.getElementById("close").addEventListener("click", () => {
  document.querySelector(".popup").classList.remove("show");
  document.body.style.overflow = "visible";
  location.href = "/";
});

showLogin();
