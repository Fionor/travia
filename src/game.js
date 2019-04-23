const QUESTION_CATEGORY_SIZE = 50;

class Game {

  constructor() {
    this.players = new Array();
    this.places = new Array(6);
    this.purses = new Array(6);
    this.inPenaltyBox = new Array(6);
  
    this.popQuestions = new Array();
    this.scienceQuestions = new Array();
    this.sportsQuestions = new Array();
    this.rockQuestions = new Array();
  
    this.currentPlayer = 0;
    this.isGettingOutOfPenaltyBox = false;

    this._initCategories();
  }

  _initCategories() {
    for (var i = 0; i < QUESTION_CATEGORY_SIZE; i++) {
      popQuestions.push(`Pop Question ${i}`);
      scienceQuestions.push(`Science Question ${i}`);
      sportsQuestions.push(`Sports Question ${i}`);
      rockQuestions.push(`Rock Question ${i}`);
    }
  }

  didPlayerWin = function () {
    return !(purses[currentPlayer] == 6)
  }

  currentCategory() {
    switch(this.places[this.currentPlayer] % 4) {
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
    players.push(playerName);
    places[this.howManyPlayers() - 1] = 0;
    purses[this.howManyPlayers() - 1] = 0;
    inPenaltyBox[this.howManyPlayers() - 1] = false;

    console.log(playerName + " was added");
    console.log("They are player number " + players.length);

    return true;
  }

  howManyPlayers(){
    return players.length;
  }
  
  askQuestion() {
    if (this.currentCategory() == 'Pop')
      console.log(popQuestions.shift());
    if (this.currentCategory() == 'Science')
      console.log(scienceQuestions.shift());
    if (this.currentCategory() == 'Sports')
      console.log(sportsQuestions.shift());
    if (this.currentCategory() == 'Rock')
      console.log(rockQuestions.shift());
  }

  roll(roll) {
    console.log(players[currentPlayer] + " is the current player");
    console.log("They have rolled a " + roll);

    if (inPenaltyBox[currentPlayer]) {
      if (roll % 2 != 0) {
        isGettingOutOfPenaltyBox = true;

        console.log(players[currentPlayer] + " is getting out of the penalty box");
        places[currentPlayer] = places[currentPlayer] + roll;
        if (places[currentPlayer] > 11) {
          places[currentPlayer] = places[currentPlayer] - 12;
        }

        console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
        console.log("The category is " + this.currentCategory());
        askQuestion();
      } else {
        console.log(players[currentPlayer] + " is not getting out of the penalty box");
        isGettingOutOfPenaltyBox = false;
      }
    } else {

      places[currentPlayer] = places[currentPlayer] + roll;
      if (places[currentPlayer] > 11) {
        places[currentPlayer] = places[currentPlayer] - 12;
      }

      console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
      console.log("The category is " + this.currentCategory());
      askQuestion();
    }
  }

  wasCorrectlyAnswered(){
    if (inPenaltyBox[currentPlayer]) {
      if (isGettingOutOfPenaltyBox) {
        console.log('Answer was correct!!!!');
        purses[currentPlayer] += 1;
        console.log(players[currentPlayer] + " now has " +
            purses[currentPlayer] + " Gold Coins.");

        var winner = didPlayerWin();
        currentPlayer += 1;
        if (currentPlayer == players.length)
          currentPlayer = 0;

        return winner;
      } else {
        currentPlayer += 1;
        if (currentPlayer == players.length)
          currentPlayer = 0;
        return true;
      }


    } else {

      console.log("Answer was correct!!!!");

      purses[currentPlayer] += 1;
      console.log(players[currentPlayer] + " now has " +
          purses[currentPlayer] + " Gold Coins.");

      var winner = didPlayerWin();

      currentPlayer += 1;
      if (currentPlayer == players.length)
        currentPlayer = 0;

      return winner;
    }
  }

  wrongAnswer() {
    console.log('Question was incorrectly answered');
    console.log(players[currentPlayer] + " was sent to the penalty box");
    inPenaltyBox[currentPlayer] = true;

    currentPlayer += 1;
    if (currentPlayer == players.length)
      currentPlayer = 0;
    return true;
  }
}

module.exports = Game;