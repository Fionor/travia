const QUESTION_TYPES = ['Pop', 'Science', 'Sports', 'Rock'];

class GameBoard {
  constructor() {
    this.answersCount = QUESTION_TYPES.reduce((prev, current) => {
      prev[current] = 0;
      return prev;
    }, {});
  }

  getQuestion(category) {
    return `${category} Question ${this.answersCount[category]++}`
  }

  getCategory(place) {
    return QUESTION_TYPES[place % 4];
  }
}

module.exports = GameBoard;