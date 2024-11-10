const tabs = document.querySelector(".toggle-buttons a");
const loginTab = document.getElementById("loginBtn");
const registerTab = document.getElementById("registerBtn");

function showRegister() {
  document.getElementById("form-title").innerText = "Registrarse";
  document.getElementById("registerFields").style.display = "block";
  document.getElementById("sendBtn").innerText = "Registrarse";
  //setClicked(registerTab, loginTab);
}

function showLogin() {
  document.getElementById("form-title").innerText = "Iniciar Sesión";
  document.getElementById("registerFields").style.display = "none";
  document.getElementById("sendBtn").innerText = "Iniciar Sesión";
  //setClicked(loginTab, registerTab);
}

loginTab.addEventListener("click", () => {
  loginTab.style.backgroundColor = "white";
  loginTab.style.backgroundImage = "linear-gradient(white, #dbd3d3)";
  loginTab.style.color = "#808080";
  loginTab.style.borderColor = "#e0656f";
  loginTab.style.borderStyle = "none none solid none";

  registerTab.style.backgroundColor = "white";
  registerTab.style.backgroundImage = "none";
  registerTab.style.color = "#9e9e9e";
  registerTab.style.borderStyle = "none";
});

registerTab.addEventListener("click", () => {
  registerTab.style.backgroundColor = "white";
  registerTab.style.backgroundImage = "linear-gradient(white, #dbd3d3)";
  registerTab.style.color = "#808080";
  registerTab.style.borderColor = "#e0656f";
  registerTab.style.borderStyle = "none none solid none";

  loginTab.style.backgroundColor = "white";
  loginTab.style.backgroundImage = "none";
  loginTab.style.color = "#9e9e9e";
  loginTab.style.borderStyle = "none";
});

tabs.addEventListener("mouseover", () => {
  tabs.style.backgroundColor = "white";
  tabs.style.backgroundImage = "linear-gradient(white, #dbd3d3)";
  tabs.style.color = "#e0656f";
  tabs.style.borderColor = "#e0656f";
  tabs.style.borderStyle = "none none solid none";
});

tabs.addEventListener("mouseout", () => {
  tabs.style.backgroundColor = "white";
  tabs.style.backgroundImage = "none";
  tabs.style.color = "#9e9e9e";
  tabs.style.borderStyle = "none";
});

loginTab.style.backgroundColor = "white";
loginTab.style.backgroundImage = "linear-gradient(white, #dbd3d3)";
loginTab.style.color = "#808080";
loginTab.style.borderColor = "#e0656f";
loginTab.style.borderStyle = "none none solid none";
showLogin();
