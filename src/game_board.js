const QUESTION_CATEGORY_SIZE = 50;

class GameBoard {
  constructor() {
    this.popQuestions = [];
    this.scienceQuestions = [];
    this.sportsQuestions = [];
    this.rockQuestions = [];

    for (var i = 0; i < QUESTION_CATEGORY_SIZE; i++) {
      this.popQuestions.push(`Pop Question ${i}`);
      this.scienceQuestions.push(`Science Question ${i}`);
      this.sportsQuestions.push(`Sports Question ${i}`);
      this.rockQuestions.push(`Rock Question ${i}`);
    }
  }

  getQuestion(place) {
    const currentCategory = this.getCategory(place);

    if (currentCategory == 'Pop')
      return this.popQuestions.shift();
    if (currentCategory == 'Science')
      return this.scienceQuestions.shift();
    if (currentCategory == 'Sports')
      return this.sportsQuestions.shift();
    if (currentCategory == 'Rock')
      return this.rockQuestions.shift();
  }

  getCategory(place) {
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
}

module.exports = GameBoard;