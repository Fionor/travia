const Player = require('./player')
const GameBoard = require('./game_board')

class Game {
  constructor() {
    this.players = new Array();
    this.currentPlayerIndex = 0;

    this.board = new GameBoard()
  }

  willContinue() {
    return this.getCurrentPlayer().purse != 6;
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

  movePlayerByRoll(roll, player) {
    player.move(roll);
    console.log(`${player.name}'s new location is ${player.place}`);

    const category = this.board.getCategory(player.place);
    console.log(`The category is ${category}`);

    const question = this.board.getQuestion(category);
    console.log(question);
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