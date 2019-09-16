class Deck {
  constructor(playerOne, playerTwo) {
    this.cards = [];
    this.matchedCards = [];
    this.selectedCards = [];
    this.startTime = new Date();
    this.matches = 0;
    this.flippedOver = 0;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.possiblePictures = []
  }

  shuffle() {
    this.possiblePictures = ['images/bay-of-islands.jpeg', 'images/cable-bay.jpeg', 'images/kaiteri.jpeg', 'images/kayak.jpeg', 'images/mt-arthur.jpeg', 'images/bay-of-islands.jpeg', 'images/cable-bay.jpeg', 'images/kaiteri.jpeg', 'images/kayak.jpeg', 'images/mt-arthur.jpeg']
    var counter = 10;
    for (var i = 0; i < 10; i++) {
      var randomNumber = Math.floor(Math.random() * Math.floor(counter));
      var card = new Card((i + 1), this.possiblePictures[randomNumber]);
      this.cards.push(card);
      this.possiblePictures.splice(randomNumber, 1);
      counter--;
    }
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

  flipCardsBack() {
    if (this.selectedCards.length === 2) {
      var card1 = document.getElementById(`card${this.selectedCards[0].cardNumber}`);
      var card2 = document.getElementById(`card${this.selectedCards[1].cardNumber}`);
      this.flipSingleCardBack(card1, 0);
      this.flipSingleCardBack(card2, 0);
      deck.flippedOver = 0;
    }
  }

  flipSingleCardBack(card, number) {
    card.classList.remove('flip-horizontal-bottom');
    card.innerHTML = `${this.selectedCards[number].cardNumber}`;
    card.style.background = 'none';
    card.classList.add('flip-vertical-bck');
    this.selectedCards[number].flip();
  }
}
