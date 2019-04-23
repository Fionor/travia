const Should = require('should');
const Game = require('./game.js');

describe("The test environment", function () {
  it("should pass", function () {
    (true).should.equal(true);
  });

  it("should access game", function () {
    Should(Game).not.equal(undefined);
  });
});

describe("Game processing", function () {
  it("Players count when are added", function() {
    const game = new Game();
    game.add('Joi');
    Should(game.players.length).be.equal(1);
  })

  it("Players count for play game", function() {
    const game = new Game();
    game.isPlayable(1).should.not.be.true();
		game.isPlayable(2).should.be.true();
  })

  it("Player add coin", function() {
    const game = new Game();
    game.add('Bob');
    game.add('Alice');

    game.players[0].addCoin();
    (game.players[0].purse).should.be.equal(1);
    (game.players[1].purse).should.be.equal(0);
  })

  it("Move player", function() {
    const game = new Game();
    game.add('Bob');
    game.players[0].move(5);
    (game.players[0].place).should.be.equal(5);
    game.players[0].move(7);
    (game.players[0].place).should.be.equal(0);
  })

  it("Test setNextPlayer", function() {
    const game = new Game();
    game.add('Bob');
    game.add('Alice');
    (game.currentPlayerIndex).should.be.equal(0);
    game.setNextPlayer();
    (game.currentPlayerIndex).should.be.equal(1);
    game.setNextPlayer();
    (game.currentPlayerIndex).should.be.equal(0);
  })
});
