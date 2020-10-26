//the right call names need to be found for reset page

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
      freq: 5,
      punch: function(target) {
        target.hp = target.hp - (10 + Math.floor(10 * Math.random()));
      }
    },
    specialSlice: {
      name: "Special Slice",
      freq: 3,
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
      freq: 2,
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
      freq: 1,
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

const wildDogs = {
  disName: "Pack of Wild Dogs",
  callName: "wildDogs",
  hp: 70,
  maxHP: 70,
  mp: 10,
  maxMP: 10,
  attacks: {
    pounce: {
      name: "Pounce",
      freq: 5,
      pounce: function(target) {
        target.hp = target.hp - (15 + Math.floor(10 * Math.random()));
      }
    },
    shredToBits: {
      name: "Shred to Bits",
      freq: 1,
      shredToBits: function(target) {
        target.hp = target.hp - (35 + (Math.floor(10 * Math.random())));
        if (wildDogs.mp < 7) {
          disBatInfo("MP too low!");
          wildDogs.attacks.pounce.pounce(target);
        } else {
          target.hp = target.hp - (35 + Math.floor(5 * Math.random()));
          wildDogs.mp = wildDogs.mp - 7;
        }
      }
      },
      lickWounds: {
        name: "Lick Wounds",
        freq: 2,
        lickWounds: function() {
          if (wildDogs.mp < 3) {
            disBatInfo("MP too low!");
            wildDogs.attacks.pounce.pounce(target);
          } else {
            wildDogs.hp = wildDogs.hp + 20 + Math.floor(7 * Math.random());
            if (wildDogs.hp > wildDogs.maxHP) wildDogs.hp = wildDogs.maxHP;
            wildDogs.mp = wildDogs.mp - 3;
          }
        }
      },
      howlSession: {
        name: "HowlSession",
        freq: 2,
        howlSession: function() {
          wildDogs.mp = wildDogs.mp + 10;
          if (wildDogs.mp > wildDogs.maxMP) wildDogs.mp = wildDogs.maxMP;
        }
      }
    }
  }



let memAr = [];
let figAr = ["beverly", "battleBot", "wildDogs"];

const createHeroSelect = () => {
  document.getElementById("batInfo").innerHTML = "Select your fighter!";
  let figSelButtons = "";
  for (let i in figAr) figSelButtons = figSelButtons.concat(`<button id="${figAr[i]}Sel" class="setUpButton" onclick="heroSelect(${figAr[i]})";}>${figAr[i]}</button>`);
  document.getElementById("controlButtons").innerHTML = figSelButtons;

}

const heroSelect = (selFig) => {
  let hero = selFig.callName;
  enemyAr = [];
  let enemySelButtons = "";
  for (let i in figAr) if (figAr[i] != selFig.callName) enemyAr.push(figAr[i]);
  for (let i in enemyAr) enemySelButtons = enemySelButtons.concat(`<button id="${enemyAr[i]}Sel" class="setUpButton" onclick="enemySel(${hero}, ${enemyAr[i]})";}>${enemyAr[i]}</button>`);
  document.getElementById("controlButtons").innerHTML = enemySelButtons;
  document.getElementById("batInfo").innerHTML = "Select your enemy!";
}

const enemySel = (hero, enemy) => {
  let beginBattleButton = `<button id="beginBattle" class="setUpButton" onclick="beginBattle(${hero.callName}, ${enemy.callName})">Fight!</battle>`;
  document.getElementById("controlButtons").innerHTML = beginBattleButton;
  document.getElementById("batInfo").innerHTML = "Hit fight to begin!";
}

function toggleHidden(item) {
  let element = document.getElementById(item);
  if (element.classList.contains("hidden") == true) element.classList.remove("hidden");
  else element.classList.add("hidden");
 }


 disContSequence = (hero, enemy) => {
   let okButton = `<button id="okButton" class="setUpButton" onclick="contSequence(${hero.callName}, ${enemy.callName})">Got it!</button>`;
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
  document.getElementById("heroHP").innerHTML = "";
  document.getElementById("heroMP").innerHTML = "";
  document.getElementById("enemyHP").innerHTML = "";
  document.getElementById("enemyMP").innerHTML = "";
  memAr = [];
  document.getElementById("controlButtons").innerHTML = `<button id="start" class="setUpButton" onclick="createHeroSelect()">Start!</button>`;
  document.getElementById("batInfo").innerHTML = `Click "Start" to Begin!`;
  toggleHidden("resetPage");
}
