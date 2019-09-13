class Deck {
  constructor(playerOneName, playerTwoName) {
    this.cards = [];
    this.matchedCards = [];
    this.selectedCards = [];
    this.matches = 0;
    this.playerOneName = playerOneName;
    this.playerTwoName = playerTwoName;
  }

  shuffle() {
    //do shuffle things
  }

  checkSelectedCards() {
    //check is cards are good
  }

  moveToMatched() {
    //when cards match then do things
  }
}
