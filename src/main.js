const Game = require('./game');

let willContinue = true;
let game = new Game();

game.add('Chet');
game.add('Pat');
game.add('Sue');

do {
  game.roll(Math.floor(Math.random() * 6) + 1);

  if (Math.floor(Math.random() * 10) == 7) {
    game.wrongAnswer();
  } else {
    game.wasCorrectlyAnswered();
  }

  willContinue = game.willContinue();
  game.setNextPlayer();
} while (willContinue);
