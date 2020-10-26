

const beverly = {
  disName: "Beverly",
  callName: "beverly",
  hp: 100,
  maxHP: 100,
  mp: 15,
  maxMP: 15,
  attacks: {
    punch: {
      name: "Punch",
      punch: function(target) {
        target.hp = target.hp - (10 + Math.floor(10 * Math.random()));
      }
    },
    specialSlice: {
      name: "Special Slice",
      specialSlice: function(target) {
        if (beverly.mp < 6) {
          disBatInfo("MP too low!");
          beverly.attacks.punch.punch(target);
        } else {
          target.hp = Math.floor(target.hp * (3 / 4));
          beverly.mp = beverly.mp - 6;
        }
      }
    },
    healingJuice: {
      name: "Healing Juice",
      healingJuice: function() {
        if (beverly.mp < 5) {
          disBatInfo("MP too low!");
          beverly.attacks.punch.punch(target);
        } else {
          beverly.hp = beverly.hp + 15 + Math.floor(10 * Math.random());
          if (beverly.hp > beverly.maxHP) beverly.hp = beverly.maxHP;
          beverly.mp = beverly.mp - 5;
        }
      }
    },
    meditate: {
      name: "Meditate",
      meditate: function() {
        beverly.mp = beverly.mp + 10;
        if (beverly.mp > beverly.maxMP) beverly.mp = beverly.maxMP;
      }
    }
  }
}

const battleBot = {
  disName: "Battle Bot",
  callName: "battleBot",
  hp: 100,
  maxHP: 100,
  mp: 10,
  maxMP: 10,
  attacks: {
    zapper: {
      name: "Zapper",
      freq: 5,
      zapper: function(target) {
        target.hp = target.hp - (12 + Math.floor(6 * Math.random()));
      }
    },
    staticDischarge: {
      name: "Static Discharge",
      freq: 2,
      staticDischarge: function(target) {
        if (battleBot.mp < 5) {
          disBatInfo("MP too low!");
          battleBot.attacks.zapper.zapper(target);
        }
        else {
          target.hp = target.hp - (23 + Math.floor(7 * Math.random()));
          battleBot.mp = battleBot.mp - 5;
        }
      }
    }
  }
}

let memAr = [];

function toggleHidden(item) {
  let element = document.getElementById(item);
  if (element.classList.contains("hidden") == true) element.classList.remove("hidden");
  else element.classList.add("hidden");
 }


 disContSequence = (hero, enemy) => {
   let okButton = `<button id="okButton" class="batOpButton" onclick="contSequence(${hero.callName}, ${enemy.callName})">Got it!</button>`;
   document.getElementById("controlButtons").innerHTML = okButton;
 }

 contSequence = (hero, enemy) => {
   if (memAr[memAr.length - 1] == enemy.disName || memAr.length == 0) {
     disBatInfo("Make a move!");
     disBatOps(hero, enemy);
   } else if (memAr[memAr.length - 1] == hero.disName) enemyAttacks(hero, enemy);
 }

disBatOps = (hero, enemy) => {
  let heroOps = Object.keys(hero.attacks);
  var buttonAr = [];
  for (let i in heroOps) buttonAr.push(`<button id="${heroOps[i]}" value="${heroOps[i]}" class="batOpButton" onclick="heroAttacks(${hero.callName}, ${enemy.callName}, this.value)">${heroOps[i]}</button>`)
  var buttonString = "";
  for (let i in buttonAr) buttonString = buttonString.concat(buttonAr[i]);
  document.getElementById("controlButtons").innerHTML = buttonString;
}


 const disBatInfo = (message) => {
   document.getElementById("batInfo").innerHTML = `${message}`;
 }

const displayHP = (hero, enemy) => {
  document.getElementById("heroMP").innerHTML = hero.disName + " MP: " + hero.mp;
  document.getElementById("enemyMP").innerHTML = enemy.disName + " MP: " + enemy.mp;
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




const enemyAttacks = (hero, enemy) => {
  let atOps = Object.keys(enemy.attacks);
  let propOpAr = [];
  for (let i in atOps) {
    for (let j = 0; j < enemy.attacks[atOps[i]].freq; j++) propOpAr.push(atOps[i]);
    }
  let selAt = propOpAr[Math.floor(propOpAr.length * Math.random())];
  enemy.attacks[selAt][selAt](hero);
  if (hero.hp <= 0) disBatInfo(`${enemy.disName} criminally accosts ${hero.disName} with ${enemy.attacks[selAt].name}. ${hero.disName} succumbs, dying a hero's death!`);
  else {
    let evilActions = [`criminally accosts ${hero.disName}`, `charges ${hero.disName} rabidly`, `violates ${hero.disName}'s human rights`, `foolishly tests ${enemy.disName}'s patience`];
    let attackPhrase = evilActions[Math.floor(evilActions.length * Math.random())];
    disBatInfo(`${enemy.disName} ${attackPhrase} with ${enemy.attacks[selAt].name}.`);
    memAr.push(enemy.disName);
}
  displayHP(hero, enemy);
}

const heroAttacks = (hero, enemy, selAt) => {
  if (hero.hp <= 0) disBatInfo(`${hero.disName} is already dead!`);
  else if (enemy.hp <= 0) disBatInfo(`${enemy.disName} is already dead!`);
  else {
    hero.attacks[selAt][selAt](enemy);
    if (enemy.hp <= 0) disBatInfo(`${hero.disName} has valiantly slain ${enemy.disName} with ${hero.attacks[selAt].name}.`);
    else {
      let heroicActions = [`heroically strikes ${enemy.disName}`, `inflicts holy terror unto ${enemy.disName}`, `shocks and awes ${enemy.disName}`, `rocks ${enemy.disName}'s world`];
      let attackPhrase = heroicActions[Math.floor(heroicActions.length * Math.random())];
      disBatInfo(`${hero.disName} ${attackPhrase} with ${hero.attacks[selAt].name}.`);
      disContSequence(hero, enemy);
      memAr.push(hero.disName);
    }
    displayHP(hero, enemy);
  }
}




const beginBattle = (hero, enemy) => {
  toggleHidden("resetPage");
  toggleHidden("beginBattle");
  if (hero.hp <= 0) disBatInfo(`${hero.disName} is already dead!`);
  else if (enemy.hp <= 0) disBatInfo(`${enemy.disName} is already dead!`);
  else {
    disContSequence(hero, enemy);
    disBatInfo(`${hero.disName} encounters ${enemy.disName}!`);
    displayHP(hero, enemy);
  }
}





const resetPage = (hero, enemy) => {
  hero.hp = hero.maxHP;
  hero.mp = hero.maxMP;
  enemy.hp = enemy.maxHP;
  enemy.mp = enemy.maxMP;
  memAr = [];
  displayHP(hero, enemy);
  document.getElementById("controlButtons").innerHTML = null;
  document.getElementById("batInfo").innerHTML = null;
  toggleHidden("resetPage");
  toggleHidden("beginBattle");
}
