let arrEnemyClass = ["Дракон", "Зверь", "Пират", "Элементаль", "Демон", "Пюдж"]

class Hero {
  constructor(name, level, healthPoints, stats) {
    this.name = name;
    this.level = level;
    this.healthPoints = healthPoints;
    this.stats = stats;
  }

  displayHero () {
    const heroInfo = `Имя: ${this.name}` + 
    `\nУровень: ${this.level}` +
    `\nЖизненные силы: ${this.healthPoints}` +
    `\nСила: ${this.stats.str}` +
    `\nИнтеллект: ${this.stats.int}` +
    `\nЛовкость: ${this.stats.agi}`;

    console.log(heroInfo)
  }
}

class Mage extends Hero {
  constructor(name, level, healthPoints, stats, mana, hasTectonicPotion) {
    super(name, level, healthPoints, stats,);
    this.mana = mana;
    this.hasTectonicPotion = hasTectonicPotion;
  }

  displayHero() {
    super.displayHero();
    if (this.mana == 0) {
      console.log('Мана отсутствует')
    } else {
      console.log(`Мана: ${this.mana}`);
    }
    
    if (this.hasTectonicPotion === "true") {
      console.log('Есть зелье для тектоника!')
    }
  }
}

class Knight extends Hero {
  constructor(name, level, healthPoints, stats, energy, isHorseTango) {
    super(name, level, healthPoints, stats,);
    this.energy = energy;
    this.isHorseTango = isHorseTango;
  }

  displayHero() {
    super.displayHero();
    if (this.energy == 0) {
      console.log('Энергия отсутствует')
    } else {
      console.log(`Энергия: ${this.energy}`);
    }
    
    if (this.isHorseTango === "true") {
      console.log('Этот герой может танцевать танго на коне')
    }
  }
}