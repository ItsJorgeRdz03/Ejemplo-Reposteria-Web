async function checkLogin() {
  const res = await fetch("/api/isLogged", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let respuestaJson = await res.json();
  respuestaJson = respuestaJson[0];
  console.log(respuestaJson);
  if (respuestaJson.res == 1) {
    document.querySelector(".user-name").innerText = respuestaJson.name;
  }
}

let index = localStorage.getItem("index");
for (let i = 0; i < index.length; i++) {
  if (!index.charAt(i).match(" ")) {
    console.log(index.charAt(i));
    console.log(localStorage.getItem(`${index.charAt(i)}`));
  }
}

document.querySelectorAll(".producto-item").forEach((item) => {
  item.querySelector(".btn-eliminar").addEventListener("click", () => {
    item.remove();
  });
  item.querySelectorAll(".btn-cantidad").forEach((btn) => {
    btn.addEventListener("click", () => {
      let count = Number.parseInt(item.querySelector(".cantidad").innerText);
      let precio = Number.parseFloat(item.querySelector(".precio").innerText);
      if (btn.innerText == "-") {
        if (count > 1) {
          count--;
          item.querySelector(".cantidad").innerText = count;
        }
      } else if (btn.innerText == "+") {
        count++;
        item.querySelector(".cantidad").innerText = count;
      }
      let total = precio * count;
      item.querySelector(".total").innerText = total;
      updateTotal();
    });
  });
});

function updateTotal() {
  let precioFinal = 0;
  document.querySelectorAll(".producto-item").forEach((item) => {
    let precio = Number.parseFloat(item.querySelector(".total").innerText);
    precioFinal = precioFinal + precio;
  });
  document.getElementById("total-reserva").innerText = precioFinal;
}

checkLogin();
updateTotal();
//document.querySelector(".user-name").innerText = respuestaJson.name;
//localStorage.setItem("index", "");
