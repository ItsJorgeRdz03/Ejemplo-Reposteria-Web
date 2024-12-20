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

function renderItems() {
  let index = localStorage.getItem("index");
  const item = document.querySelector(".item-box");
  const cont = document.querySelector(".productos-lista");
  cont.innerHTML = "";
  if (index.length > 0) {
    document.querySelector(".carrito-reservas").style.display = "block";
    document.querySelector(".empty").style.display = "none";
    for (let i = 0; i < index.length; i++) {
      if (!index.charAt(i).match(" ")) {
        let data = JSON.parse(localStorage.getItem(`${index.charAt(i)}`));
        item.querySelector("img").src = data.img;
        item.querySelector("h3").innerText = data.nombre;
        item.querySelector(".precio").innerText = data.precio;
        item.querySelector(".total").innerText =
          Number.parseFloat(data.precio) *
          Number.parseInt(item.querySelector(".cantidad").innerText);
        item.querySelector(".id").innerText = index.charAt(i);
        cont.innerHTML += item.innerHTML;
      }
    }
  }
  updateBtns();
}

function updateBtns() {
  document.querySelectorAll(".producto-item").forEach((item) => {
    item.querySelector(".btn-eliminar").addEventListener("click", () => {
      removeItem(item.querySelector(".id").innerText);
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
}

function updateTotal() {
  let precioFinal = 0;
  document.querySelectorAll(".producto-item").forEach((item) => {
    let precio = Number.parseFloat(item.querySelector(".total").innerText);
    precioFinal = precioFinal + precio;
  });
  document.getElementById("total-reserva").innerText = precioFinal;
}

function removeItem(id) {
  let index = localStorage.getItem("index");
  const res = index
    .split(" ")
    .filter((num) => num !== id)
    .join(" ");
  localStorage.setItem("index", res);
  localStorage.removeItem(id);
  if (res.length == 0) {
    document.querySelector(".carrito-reservas").style.display = "none";
    document.querySelector(".empty").style.display = "block";
  }
}

document.querySelector(".btn-confirmar").addEventListener("click", async () => {
  let count = 0;
  let data = {
    pedidos: [],
    fecha: document.getElementById("fecha").value,
    hora: document.getElementById("hora").value,
  };
  document.querySelectorAll(".producto-item").forEach((item) => {
    data.pedidos[count] = {
      id: item.querySelector(".id").innerText,
      cantidad: item.querySelector(".cantidad").innerText,
    };
    count++;
  });
  const pedidos = Object.values(data.pedidos);
  data.pedidos = pedidos;
  console.log(data);
  const res = await fetch("/api/setReservacion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  let respuestaJson = await res.json();
  if (respuestaJson[0].res == 1) {
    document.querySelector(".ticket").innerText = respuestaJson[0].ticket;
    document.querySelector(".fecha-r").innerText = data.fecha;
    document.querySelector(".hora-r").innerText = data.hora;
    document.querySelector(".popup").classList.add("show");
    document.body.style.overflow = "hidden";
  } else {
    document.querySelector(".popup-error").classList.add("show");
    document.body.style.overflow = "hidden";
  }
});

document.querySelector(".logout").addEventListener("click", async () => {
  const res = await fetch("/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let respuestaJson = await res.json();
  if (respuestaJson[0].res == 1) {
    checkLogin();
    localStorage.setItem("index", "");
    location.href = "/";
  }
});

document.getElementById("close").addEventListener("click", () => {
  document.querySelector(".popup").classList.remove("show");
  document.body.style.overflow = "visible";
  localStorage.setItem("index", "");
  location.href = "/reservar";
});

document.getElementById("close-error").addEventListener("click", () => {
  document.querySelector(".popup-error").classList.remove("show");
  document.body.style.overflow = "visible";
});

checkLogin();
renderItems();
updateTotal();
//document.querySelector(".user-name").innerText = respuestaJson.name;
//localStorage.setItem("index", "");
