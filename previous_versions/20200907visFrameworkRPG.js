beverly = {
  callName: "beverly",
  disName: "Beverly",
  prevImg: "beverlyImg.jpg"
}
battleBot = {
  callName: "battleBot",
  disName: "Battle Bot",
  prevImg: "battleBotImg.jpg"
}

figAr = ["beverly", "battleBot"];
let selButtons = "";
for (let i in figAr) {
  selButtons = selButtons.concat(`<button id="sel${figAr[i]}" onmouseover="disPrevFig(${figAr[i]}.prevImg); changeSelButtonColor(this)" onmouseout="hidePrevFig(); changeBackSelButtonColor(this)" class="normColor">${figAr[i]}</button>`)
}
document.getElementById("buttonDiv").innerHTML = selButtons;

const changeSelButtonColor = (obj) => {
  obj.style.backgroundColor = "hsla(180, 50%, 40%, 1)";
}

const changeBackSelButtonColor = (obj) => {
    obj.style.backgroundColor = "hsla(180, 50%, 50%, 1)";
}

const disPrevFig = (img) => {
  document.getElementById("imgDiv").src = img;
}

const hidePrevFig = () => {
  document.getElementById("imgDiv").src = "";
}
