let index = localStorage.getItem("index");
console.log(index);
for (let i = 0; i < index.length; i++) {
  if (!index.charAt(i).match(" ")) {
    console.log(index.charAt(i));
    console.log(localStorage.getItem(`${index.charAt(i)}`));
  }
}
//document.querySelector(".user-name").innerText = respuestaJson.name;
//localStorage.setItem("index", "");
