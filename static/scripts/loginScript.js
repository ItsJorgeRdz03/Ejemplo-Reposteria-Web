//const tabs = document.querySelector(".toggle-buttons a");
//const loginTab = document.getElementById("loginBtn");
//const registerTab = document.getElementById("registerBtn");
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
  if (sendBtn.innerText == "Iniciar Sesión") {
    /*const res = await fetch("/api/setLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value, pass: pass.value }),
    });*/
  } else {
    /*const res = await fetch("/api/setUsuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre.value,
        ap: apellidoP.value,
        am: apellidoM.value,
        tel: tel.value,
        gen: gender.value,
        fecha: fechaN.value,
        email: email.value,
        pass: pass.value,
      }),
    });*/
  }
});

showLogin();
