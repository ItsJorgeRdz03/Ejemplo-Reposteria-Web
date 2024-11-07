const nombreRegex = new RegExp(
  "^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+(\\s+[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+)+$"
);
const emailRegex = new RegExp("^\\w+@[a-zA-Z_]+?(\\.[a-zA-Z]{2,3}){1,2}$");
var nom = "";
var nomC = "";
var correo = "";

function startRequest(method, url, data, bool) {
  const req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (req.readyState == XMLHttpRequest.DONE) {
      console.log(req.responseText);
      //output.value = req.responseText;
    }
  };
  req.open(method, url, bool);
  req.send(data);
  //req.setRequestHeader("Content-type", "application/json");
  //req.send(JSON.stringify(data));
}

document.getElementById("resBtn").addEventListener("click", (e) => {
  e.preventDefault();
  let tNombre = document.getElementById("nombre").value.trim();
  let tEmail = document.getElementById("correo").value.trim();
  checkName(tNombre);
  checkEmail(tEmail);

  startRequest("POST", "test", "", true);

  if (nomC != "" && correo != "") {
    setInfoText();
    document.querySelector(".popup").classList.add("show");
    document.body.style.overflow = "hidden";
  } else {
    document.querySelector(".popup-error").classList.add("show");
    document.body.style.overflow = "hidden";
  }
});

document.getElementById("close").addEventListener("click", () => {
  nom = "";
  nomC = "";
  correo = "";
  setInfoText();
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
  nomC = getFistName(nom);
  return true;
}

function checkEmail(email) {
  if (email == "") {
    return false;
  } else if (!emailRegex.test(email)) {
    return false;
  }
  correo = email;
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

function setInfoText() {
  document.getElementById("name").innerText = nomC;
  document.getElementById("email").innerText = correo;
}
