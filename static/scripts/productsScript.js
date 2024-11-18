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

async function getData() {
  const res = await fetch("/api/allProducts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let respuestaJson = await res.json();
  respuestaJson = respuestaJson[0];
  if (respuestaJson.res == 1) {
    const card = document.querySelector(".box");
    const cont = document.querySelector("main");
    cont.innerHTML = "";
    for (let i = 0; i < respuestaJson.data.length; i++) {
      card.querySelector("img").src = respuestaJson.data[i].img;
      card.querySelector("h2").innerText = respuestaJson.data[i].nombre;
      card.querySelector(".id").innerText = respuestaJson.data[i].pkIdProd;
      card.querySelector(".product-description").innerText =
        respuestaJson.data[i].descr;
      card.querySelector(".stock").innerText =
        "Disponible: " + respuestaJson.data[i].cantidad;
      card.querySelector(".price").innerText = respuestaJson.data[i].precio;
      cont.innerHTML += card.innerHTML;
    }
    document.querySelectorAll(".product-card").forEach((card) => {
      console.log(card.querySelector(".id").innerText);
      card.querySelector(".reserve-btn").addEventListener("click", () => {
        //Almacenar datos en localStorage
        let id = card.querySelector(".id").innerText;
        let array = localStorage.getItem("index");
        if (array.match(`${id}`) == null) {
          let indexData =
            localStorage.getItem("index") == ""
              ? id
              : localStorage.getItem("index") + " " + id;
          console.log(respuestaJson.data[Number.parseInt(id)]);
          let data = {
            img: card.querySelector("img").src,
            nombre: card.querySelector("h2").innerText,
            precio: card.querySelector(".price").innerText,
          };
          localStorage.setItem("index", indexData);
          localStorage.setItem(id, JSON.stringify(data));
        }
        location.href = "/carrito";
      });
    });
  } else {
    document.querySelector("main").innerHTML = "";
    document.querySelector("main").innerText = "No hay productos disponibles";
    document.querySelector("main").style.fontWeight = "bold";
  }
}

checkLogin();
getData();

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
    location.href = "/";
  }
});

let array = "";
console.log(array.match("1"));
