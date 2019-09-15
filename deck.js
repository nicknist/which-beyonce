class Deck {
  constructor(playerOneName, playerTwoName) {
    this.cards = [];
    this.matchedCards = [];
    this.selectedCards = [];
    this.startTime = new Date();
    this.matches = 0;
    this.flippedOver = 0;
    this.playerOneName = playerOneName;
    this.playerTwoName = playerTwoName;
    this.possibleCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.possiblePictures = ['images/bay-of-islands.jpeg', 'images/cable-bay.jpeg', 'images/kaiteri.jpeg', 'images/kayak.jpeg', 'images/mt-arthur.jpeg', 'images/bay-of-islands.jpeg', 'images/cable-bay.jpeg', 'images/kaiteri.jpeg', 'images/kayak.jpeg', 'images/mt-arthur.jpeg']
  }

  shuffle() {
    //do shuffle things
  }

  checkSelectedCards() {
  if (this.selectedCards[0].picture === this.selectedCards[1].picture) {
      this.moveToMatched();
    }
  }

  moveToMatched() {
    this.matches += 1;
    document.getElementById('player-one-matches').innerHTML = this.matches;
    this.selectedCards[0].match();
    this.selectedCards[1].match();
    document.getElementById(`card${this.selectedCards[0].cardNumber}`).remove();
    document.getElementById(`card${this.selectedCards[1].cardNumber}`).remove();
    this.matchedCards = this.selectedCards;
    this.selectedCards = [];
    this.flippedOver = 0;
  }
}
