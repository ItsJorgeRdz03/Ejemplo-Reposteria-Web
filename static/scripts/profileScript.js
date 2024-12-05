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

document.getElementById("edit-profile").addEventListener("click", () => {
  location.href = "/soon";
});

document.querySelectorAll(".btn.cancelar").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    alert("Cancelando la reserva...");
    // Aquí va la lógica para cancelar la reserva
  });
});

document.querySelectorAll(".btn.confirmar").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (!btn.disabled) {
      alert("Confirmando la reserva...");
      // Aquí va la lógica para confirmar la reserva
    }
  });
});

async function getData() {
  const res = await fetch("/api/getUserData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  respuestaJson = await res.json();
  if (respuestaJson.res == 1) {
    console.log(respuestaJson.res);
    document.getElementById("user-n").innerText = respuestaJson.nombre;
    document.getElementById("user-email").innerText = respuestaJson.email;
    document.getElementById("user-phone").innerText = respuestaJson.telefono;
    document.getElementById("user-gender").innerText = respuestaJson.genero;
    document.getElementById("user-dob").innerText = respuestaJson.fechaNac;
  }
}

async function getResData() {
  const res = await fetch("/api/getReserveData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  respuestaJson = await res.json();
  console.log(respuestaJson[0]);
  if (respuestaJson[0][0].res == 1) {
    const card = document.querySelector(".box");
    const cont = document.querySelector(".historial-reservas");
    cont.innerHTML = "<h2>Mis Reservas</h2>";
    for (let i = 0; i < respuestaJson[0].length; i++) {
      const tCard = card;
      tCard.querySelector(
        ".nombre span"
      ).innerText = `${respuestaJson[0][i].nombre}`;
      tCard.querySelector(
        ".cantidad span"
      ).innerText = `${respuestaJson[0][i].cantidad}`;
      tCard.querySelector(
        ".fecha span"
      ).innerText = `${respuestaJson[0][i].fechaRes}`;
      tCard.querySelector(
        ".hora span"
      ).innerText = `${respuestaJson[0][i].horaRes}`;
      tCard.querySelector(
        ".ticket span"
      ).innerText = `${respuestaJson[0][i].fkIdTicket}`;
      tCard.querySelector(".idP").innerText = `${respuestaJson[0][i].fkIdProd}`;
      tCard.querySelector(
        ".estado"
      ).innerText = `${respuestaJson[0][i].estado}`;
      if (respuestaJson[0][i].estado == "En proceso") {
        tCard.querySelector(".estado").className = "estado estado-en-proceso";
        tCard.querySelector(".btn.cancelar").disabled = false;
        tCard.querySelector(".btn.confirmar").disabled = false;
      } else if (respuestaJson[0][i].estado == "Listo") {
        tCard.querySelector(".estado").className = "estado estado-listo";
        tCard.querySelector(".btn.cancelar").disabled = true;
        tCard.querySelector(".btn.confirmar").disabled = false;
      } else if (respuestaJson[0][i].estado == "Recogido") {
        tCard.querySelector(".estado").className = "estado confirmado";
        tCard.querySelector(".btn.cancelar").disabled = true;
        tCard.querySelector(".btn.confirmar").disabled = true;
      } else if (respuestaJson[0][i].estado == "Cancelado") {
        tCard.querySelector(".estado").className = "estado cancelado";
        tCard.querySelector(".btn.cancelar").disabled = true;
        tCard.querySelector(".btn.confirmar").disabled = true;
      }
      cont.innerHTML += tCard.innerHTML;
      setBtns();
    }
  }
}

async function setBtns() {
  document.querySelectorAll(".reserva-card").forEach((card) => {
    card.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        data = {
          user: null,
          prod: card.querySelector(".idP").innerText,
          ticket: card.querySelector(".ticket span").innerText,
          st: "",
        };
        if (e.target.id == "confirm") {
          data.st = 3;
        } else if (e.target.id == "cancel") {
          data.st = 4;
        }
        const res = await fetch("/api/updateReserva", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        respuestaJson = await res.json();
        console.log(respuestaJson);
        if (respuestaJson[0].res == 1) {
          if (data.st == 3) {
            card.querySelector(".estado").className = "estado confirmado";
          } else if (data.st == 4) {
            card.querySelector(".estado").className = "estado cancelado";
          }
          card.querySelector(".btn.cancelar").disabled = true;
          card.querySelector(".btn.confirmar").disabled = true;
        }
      });
    });
  });
}

getData();
getResData();
