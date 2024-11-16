async function checkLogin() {
  const res = await fetch("/api/isLogged", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let respuestaJson = await res.json();
  respuestaJson = respuestaJson[0].res;
  if (respuestaJson == 1) {
    document.querySelector("h1").innerText = "✅ Sesión Iniciada";
    document.querySelector("p").innerText =
      "Parece que ya tienes una sesión iniciada. Puedes regresar y conocer todas las funciones que tienes como usuario.";
    document.querySelector("a").innerText = "Página de inicio";
    document.querySelector("a").href = "/";
  }
}

checkLogin();
