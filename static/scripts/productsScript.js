async function getData() {
  const res = await fetch("/api/allProducts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let respuestaJson = await res.json();
  console.log(respuestaJson);
  if (respuestaJson[0] == 1) {
  }
}

getData();
