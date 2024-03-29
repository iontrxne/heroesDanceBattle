const gameParameters = {
  MAX_LEVEL: 10, 
  MAX_STAT: 99, 
  MIN_STAT: 10 
};

const initialZones = document.querySelector('.game-zones').innerHTML;

const gameClasses = {
  Mage: "Маг",
  Knight: "Рыцарь"
};

let enemyHero = null;
let playerHero = null;


const sendToBattleButton = document.getElementById("sendToBattleButton");

const doSkillButton = document.getElementById("doSkillButton");

const getEnemyButton = document.getElementById("getEnemyButton");

const startBattleButton = document.getElementById("startBattleButton");

function displayPlayerHero(hero) {
  document.getElementById("playerHeroClass").innerHTML =
    gameClasses[hero.constructor.name];
  document.getElementById("playerHeroName").innerHTML = hero.name;
  document.getElementById("playerHeroLevel").innerHTML = hero.level;
  document.getElementById("playerHeroHp").innerHTML = hero.healthPoints;
  document.getElementById("playerHeroStrength").innerHTML = hero.stats.str;
  document.getElementById("playerHeroIntelligence").innerHTML = hero.stats.int;
  document.getElementById("playerHeroAgility").innerHTML = hero.stats.agi;

  hero.displayHero();
}


function displayEnemyHero(hero) {
  document.getElementById("enemyHeroClass").innerHTML =
  arrEnemyClass[Math.floor(Math.random() * arrEnemyClass.length)];
  document.getElementById("enemyHeroName").innerHTML = hero.name;
  document.getElementById("enemyHeroLevel").innerHTML = hero.level;
  document.getElementById("enemyHeroHp").innerHTML = hero.healthPoints;
  document.getElementById("enemyHeroStrength").innerHTML = hero.stats.str;
  document.getElementById("enemyHeroIntelligence").innerHTML = hero.stats.int;
  document.getElementById("enemyHeroAgility").innerHTML = hero.stats.agi;

  hero.displayHero();
}


sendToBattleButton.onclick = () => {
  const heroName = document.getElementById("name").value;
  if (heroName !== "") {
    const heroClass = document.querySelector(
      'input[name="class"]:checked'
    ).value;

    let heroLevel = document.getElementById("level").value;
    
    if (heroLevel == "") {
      heroLevel = 1
    }

    if (heroLevel > gameParameters.MAX_LEVEL) {
      heroLevel = gameParameters.MAX_LEVEL
    }

    const heroStats = {};

    heroStats.str = Number(document.getElementById("strength").value);
    if (heroStats.str > gameParameters.MAX_STAT) {
      heroStats.str = gameParameters.MAX_STAT;
    }
    heroStats.int = Number(document.getElementById("intelligence").value);
    if (heroStats.int > gameParameters.MAX_STAT) {
      heroStats.int = gameParameters.MAX_STAT;
    }
    heroStats.agi = Number(document.getElementById("agility").value);
    if (heroStats.agi > gameParameters.MAX_STAT) {
      heroStats.agi = gameParameters.MAX_STAT;
    }

    const additionalAbility = document.querySelector(
      'input[name="additionalAbility"]:checked'
    ).value;
    const additionalStat = document.getElementById("additionalStat").value;

    if (heroClass === "Mage") {
      playerHero = new Mage(
        heroName,
        heroLevel,
        100,
        heroStats,
        additionalStat,
        additionalAbility,
      );
    } else if (heroClass === "Knight") {
      playerHero = new Knight(
        heroName,
        heroLevel,
        100,
        heroStats,
        additionalStat,
        additionalAbility
      );
    } else {
      console.error("Упс! Произошла какая-то ошибка!");
      return;
    }

    displayPlayerHero(playerHero);

    getEnemyButton.removeAttribute("disabled");

    if (additionalAbility === 'true') {
      doSkillButton.removeAttribute("disabled"); 
    }

  } else {
    alert("Добавьте герою имя!");
  }
};

getEnemyButton.onclick = () => {
  fetch(`https://api-code.practicum-team.ru/heroes`)
    .then((response) => response.json())
    .then((data) => {
      let randomEnemy = data[Math.floor(Math.random() * data.length)]; 
      console.log(randomEnemy); 

      enemyHero = new Hero(
        randomEnemy.title, 
        Math.floor(Math.random() * 10) + 1,
        randomEnemy.hp,
        {
          str: randomEnemy.str,
          int: randomEnemy.int,
          agi: randomEnemy.agi
        }
      );

      displayEnemyHero(enemyHero);

      if (playerHero) {
        startBattleButton.removeAttribute("disabled");
      }
    })
    .catch((error) => console.error("Ошибка:", error));
};

function countStatsSum(hero) {
  let statsSum = 0;
  statsSum += hero.stats.str;
  statsSum += hero.stats.int;
  statsSum += hero.stats.agi;
  statsSum += hero.healthPoints;

  return statsSum;
} 

function arena(firstHero, secondHero) {
  console.log(
    `Да начнётся танцевальный баттл между ${firstHero.name} и ${secondHero.name}!`
  );

  let winner = null;

  let fistHeroSum = countStatsSum(firstHero);
  let secondHeroSum = countStatsSum(secondHero);

  console.log("Сумма значений параметров первого героя: ", fistHeroSum);
  console.log("Сумма значений параметров второго героя: ", secondHeroSum);

    if (fistHeroSum > secondHeroSum) {
      winner = firstHero;
  } else if (fistHeroSum < secondHeroSum) {
    winner = secondHero;
  }

  if (winner) {
    console.log(`Ритмично чествуем победителя: ${winner.name}`);
    document.querySelector('.game-zones').innerHTML = 
    `
    <div class="result">
      <h2>Ритмично чествуем победителя: ${winner.name}</h2>
      <button id="reloadGameButton" class="battle-zone-button">Сразиться еще раз</button>
    </div>
    `
    
  } else {
    console.log("В танцевальном баттле победила дружба!");
    document.querySelector('.game-zones').innerHTML = 
    `
    <div class="result">
      <h2>В танцевальном баттле победила дружба!</h2>
      <button id="reloadGameButton" class="battle-zone-button">Сразиться еще раз</button>
    </div>
    `
  }
} 

startBattleButton.onclick = () => {
  arena(playerHero, enemyHero);

  document.querySelector('.game-zones').addEventListener('click', (event) => {
    if (event.target && event.target.id === 'reloadGameButton') {
      location.reload();
    }
  });
}; 

doSkillButton.onclick = () => {

  const heroClass = document.querySelector(
    'input[name="class"]:checked'          
  ).value;
  
  const additionalAbility = document.querySelector(
    'input[name="additionalAbility"]:checked'
  ).value;

  let additionalStat = Number(document.getElementById("additionalStat").value);

  const heroStats = {};
  heroStats.int = Number(document.getElementById("intelligence").value);
  heroStats.agi = Number(document.getElementById("agility").value);

  
  if (additionalAbility === "true" ) {
    if (heroClass === "Mage") {

      if (additionalStat < 20) {
        console.log("Не хватает маны!")
      } 
      else if (additionalStat >= 20) {
        additionalStat -= (additionalStat/2);
        heroStats.int += 30;
      }

      if (heroStats.int > gameParameters.MAX_STAT) {
        heroStats.int = gameParameters.MAX_STAT
      }

      document.getElementById("playerHeroIntelligence").innerHTML = heroStats.int;
      
      console.log(`Осталось маны: ${Math.floor(additionalStat)}` +
      `\nИнтеллект:${heroStats.int}`) 

      doSkillButton.disabled = true;
    } else if (heroClass === "Knight") {

      if (additionalStat < 20) {
        console.log("Не хватает энергии!")
      } 
      else if (additionalStat >= 20) {
        additionalStat -= (additionalStat/2);
        heroStats.agi += 30;
      }

      if (heroStats.agi > gameParameters.MAX_STAT) {
        heroStats.agi = gameParameters.MAX_STAT
      }

      document.getElementById("playerHeroAgility").innerHTML = heroStats.agi;
      console.log(`Осталось энергии: ${Math.floor(additionalStat)}` +
      `\nЛовкость:${heroStats.agi}`) 

      doSkillButton.disabled = true;
    }
  }
}