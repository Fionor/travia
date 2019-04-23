class Player {
  constructor(name) {
    this.name = name;
    this.place = 0;
    this.purse = 0;
    this.inPenaltyBox = false;
  }

  move(roll) {
    this.place += roll;
    if (this.place > 11)
      this.place -= 12;
  }

  addCoin() {
    this.purse += 1;
  }
}

module.exports = Player;