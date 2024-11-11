const nombreRegex = new RegExp(
  "^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+(\\s+[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+)+$"
);
const nombreComp = new RegExp("^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+$");
const emailRegex = new RegExp("^\\w+@[a-zA-Z_]+?(\\.[a-zA-Z]{2,3}){1,2}$");
const tel = new RegExp("^\\d{10}$");
const genero = new RegExp("(Hombre|Mujer|Otro)$");

export function capitlizeText(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word[0].toUpperCase() + word.substr(1);
    })
    .join(" ");
}
//home
export function checkName(name) {
  if (name == "") {
    return false;
  } else if (!nombreRegex.test(name)) {
    return false;
  }
  return true;
}

export function getFistName(name) {
  let nArray = name.split(/(\s+)/);
  return nArray[0];
}

export function getLastName(name) {
  let nArray = name.split(/(\s+)/);
  if (nArray[2] != "" || nArray[2] != " ") {
    return nArray[2];
  } else {
    return null;
  }
}
//login
export function checkEmail(email) {
  if (email == "") {
    return false;
  } else if (!emailRegex.test(email)) {
    return false;
  }
  return true;
}

export function checkNomComp(comp) {
  if (comp == "") {
    return false;
  } else if (!nombreComp.test(comp)) {
    return false;
  }
  return true;
}

export function checkTel(tele) {
  if (tele == "") {
    return false;
  } else if (!tel.test(tele)) {
    return false;
  }
  return true;
}

export function checkGen(gen) {
  if (gen == "") {
    return false;
  } else if (!genero.test(gen)) {
    return false;
  }
  return true;
}
