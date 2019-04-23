const Player = require('./player')

const QUESTION_CATEGORY_SIZE = 50;

class Game {

  constructor() {
    this.players = new Array();
  
    this.popQuestions = new Array();
    this.scienceQuestions = new Array();
    this.sportsQuestions = new Array();
    this.rockQuestions = new Array();
  
    this.currentPlayerIndex = 0;

    this._initCategories();
  }

  _initCategories() {
    for (var i = 0; i < QUESTION_CATEGORY_SIZE; i++) {
      this.popQuestions.push(`Pop Question ${i}`);
      this.scienceQuestions.push(`Science Question ${i}`);
      this.sportsQuestions.push(`Sports Question ${i}`);
      this.rockQuestions.push(`Rock Question ${i}`);
    }
  }

  willContinue() {
    return this.getCurrentPlayer().purse != 6;
  }

  currentCategory(place) {
    switch(place % 4) {
      case 0:
        return 'Pop';
      case 1:
        return 'Science';
      case 2:
        return 'Sports';
      default:
        return 'Rock';
    }
  }
  
  isPlayable(howManyPlayers) {
    return howManyPlayers >= 2;
  }

  add(playerName) {
    const player = new Player(playerName);
    const totalPlayers = this.players.push(player);

    console.log(`${playerName} was added`);
    console.log(`They are player number ${totalPlayers}`);

    return true;
  }

  howManyPlayers() {
    return this.players.length;
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  setNextPlayer() {
    this.currentPlayerIndex += 1;

    if (this.currentPlayerIndex == this.players.length)
      this.currentPlayerIndex = 0;
  }
  
  askQuestion(place) {
    const currentCategory = this.currentCategory(place);

    if (currentCategory == 'Pop')
      return this.popQuestions.shift();
    if (currentCategory == 'Science')
      return this.scienceQuestions.shift();
    if (currentCategory == 'Sports')
      return this.sportsQuestions.shift();
    if (currentCategory == 'Rock')
      return this.rockQuestions.shift();
  }

  movePlayerByRoll(roll, player) {
    player.move(roll);
    console.log(`${player.name}'s new location is ${player.place}`);

    console.log(`The category is ${this.currentCategory(player.place)}`);
    console.log(this.askQuestion(player.place));
  }

  roll(roll) {
    const player = this.getCurrentPlayer();
    console.log(`${player.name} is the current player`);
    console.log(`They have rolled a ${roll}`);

    if (player.inPenaltyBox == false) {
      this.movePlayerByRoll(roll, player);
      return;
    }

    if (roll % 2 != 0) {  
      console.log(`${player.name} is getting out of the penalty box`);
      player.inPenaltyBox = false;
      this.movePlayerByRoll(roll, player);
    } else {
      console.log(`${player.name} is not getting out of the penalty box`);
    }
  }

  wasCorrectlyAnswered(){
    const player = this.getCurrentPlayer();
    player.addCoin();
    console.log(`Answer was correct!!!!`);
    console.log(`${player.name} now has ${player.purse} Gold Coins.`);
  }

  wrongAnswer() {
    const player = this.getCurrentPlayer();
    player.inPenaltyBox = true;
    console.log('Question was incorrectly answered');
    console.log(`${player.name} was sent to the penalty box`);
  }
}

module.exports = Game;