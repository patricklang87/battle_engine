

const beverly = {
  disName: "Beverly",
  callName: "beverly",
  hp: 100,
  maxHP: 100,
  mp: 10,
  attacks: {
    punch: {
      name: "Punch",
      punch: function(target) {
        target.hp = target.hp - 12 + Math.floor(8 * Math.random());
      }
    },
    specialSlice: {
      name: "Special Slice",
      specialSlice: function(target) {
        if (beverly.hp < 5) {
          disBatInfo(`MP too low!`);
        } else {
          target.hp = Math.floor(target.hp * (2 / 3));
          beverly.mp = beverly.mp - 5;
        }
      }
    }
  }
}

const battleBot = {
  disName: "Battle Bot",
  callName: "battleBot",
  hp: 100,
  maxHP: 100,
  attacks: {
    zapper: {
      name: "Zapper",
      zapper: function(target) {
        target.hp = target.hp - 10 + Math.floor(6 * Math.random());
      }
    },
    staticDischarge: {
      name: "Static Discharge",
      staticDischarge: function(target) {
        target.hp = target.hp - 20;
      }
    }
  }
}

function toggleHidden(item) {
  let element = document.getElementById(item);
  if (element.classList.contains("hidden") == true) element.classList.remove("hidden");
  else element.classList.add("hidden");
 }

 const disBatInfo = (message) => {
   document.getElementById("batInfo").innerHTML = `${message}`;
 }

const displayHP = (hero, enemy) => {
  document.getElementById("heroMP").innerHTML = hero.disName + " MP: " + hero.mp;
  if (hero.hp <= 0) {
    document.getElementById("heroHP").style.color = "red";
    document.getElementById("heroHP").innerHTML = hero.disName + " is mournfully desceased.";
  } else if (hero.hp < (1/4) * hero.maxHP) {
    document.getElementById("heroHP").style.color = "orange";
    document.getElementById("heroHP").innerHTML = hero.disName + " HP: " + hero.hp;
  } else {
    document.getElementById("heroHP").style.color = "hsla(170, 100%, 97%, 1)";
    document.getElementById("heroHP").innerHTML = hero.disName + " HP: " + hero.hp;
  }
  if (enemy.hp <= 0) {
    document.getElementById("enemyHP").style.color = "red";
    document.getElementById("enemyHP").innerHTML = enemy.disName + " is ding dong dead.";
  } else if (enemy.hp < (1/4) * enemy.maxHP) {
    document.getElementById("enemyHP").style.color = "orange";
    document.getElementById("enemyHP").innerHTML = enemy.disName + " HP: " + enemy.hp;
  } else {
    document.getElementById("enemyHP").style.color = "hsla(170, 100%, 97%, 1)";
    document.getElementById("enemyHP").innerHTML = enemy.disName + " HP: " + enemy.hp;
  }
}



const contBattle = () => {

    disBatInfo(`Choose your attack!`);
    let element = document.getElementsByClassName("batOpButton");
    for (let i in element) element[i].classList.remove("hidden");

}

const enemyAttacks = (hero, enemy) => {
  let atOps = Object.keys(enemy.attacks);
  let selAt = atOps[Math.floor(atOps.length * Math.random())];
  enemy.attacks[selAt][selAt](hero);
  if (hero.hp <= 0) disBatInfo(`${enemy.disName} criminally accosts ${hero.disName} with ${enemy.attacks[selAt].name}. ${hero.disName} succumbs, dying a hero's death!`);
  else disBatInfo(`${enemy.disName} criminally accosts ${hero.disName} with ${enemy.attacks[selAt].name}.`);
  displayHP(hero, enemy);
  memoryAr.push(enemy.disname);
  toggleHidden("contBattle");
  let element = document.getElementsByClassName("batOpButton");
  for (let i in element) element[i].classList.add("hidden");

}

const heroAttacks = (hero, enemy, selAt) => {
  if (hero.hp <= 0) disBatInfo(`${hero.disName} is already dead!`);
  else if (enemy.hp <= 0) disBatInfo(`${enemy.disName} is already dead!`);
  else {
    hero.attacks[selAt][selAt](enemy);
    if (enemy.hp <= 0) disBatInfo(`${hero.disName} has valiantly slain ${enemy.disName} with ${hero.attacks[selAt].name}.`);
    else {
      disBatInfo(`${hero.disName} heroically strikes ${enemy.disName} with ${hero.attacks[selAt].name}.`);
      document.getElementById("controlButtons").innerHTML = `<button id="contBattle" onclick="contBattle()" class="hidden">Got it!</button>`;
      memoryAr.push(hero.disname);
    }
    displayHP(hero, enemy);
    document.getElementById("controlButtons").innerHTML = `<button id="contBattle" onclick="contBattle()" class="hidden">Got it!</button>`;
  }
}


const beginBattle = (hero, enemy) => {
  let memoryAr = [];
  toggleHidden("resetPage");
  toggleHidden("beginBattle");
  if (hero.hp <= 0) disBatInfo(`${hero.disName} is already dead!`);
  else if (enemy.hp <= 0) disBatInfo(`${enemy.disName} is already dead!`);
  else {
    let heroOps = Object.keys(hero.attacks);
    let buttonAr = [];
    for (let i in heroOps) buttonAr.push(`<button id="${heroOps[i]}" value="${heroOps[i]}" class="batOpButton hidden" onclick="heroAttacks(${hero.callName}, ${enemy.callName}, this.value)">${heroOps[i]}</button>`)
    let buttonString = "";
    for (let i in buttonAr) buttonString = buttonString.concat(buttonAr[i]);
    document.getElementById("controlButtons").innerHTML = buttonString;
    disBatInfo(`${hero.disName} encounters ${enemy.disName}!`);
    toggleHidden("contBattle");
    displayHP(hero, enemy);
  }
}

const resetPage = (hero, enemy) => {
  hero.hp = hero.maxHP;
  enemy.hp = enemy.maxHP;
  displayHP(hero, enemy);
  document.getElementById("controlButtons").innerHTML = null;
  document.getElementById("batInfo").innerHTML = null;
  toggleHidden("resetPage");
  toggleHidden("beginBattle");
}
