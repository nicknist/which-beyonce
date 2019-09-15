class Card {
  constructor(cardNumber, picture) {
    this.matched = false;
    this.cardNumber = cardNumber;
    this.picture = picture;
    this.isFlipped = false;
  }

  flip() {
    if (this.isFlipped === false) {
      this.isFlipped = true;
      deck.selectedCards.push(this);
    } else {
      this.isFlipped = false;
      deck.selectedCards.splice(      deck.selectedCards.indexOf(this), 1);
    }
  }

  match() {
    this.matched = true;
  }
}
