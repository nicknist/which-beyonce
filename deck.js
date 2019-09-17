class Deck {
  constructor(playerOne, playerTwo) {
    this.cards = [];
    this.matchedCards = [];
    this.selectedCards = [];
    this.currentGameMatches = 0;
    this.startTime = new Date();
    this.flippedOver = 0;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.possiblePictures = []
    this.currentTurn = playerOne;
    this.winner = null;
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
    this.chooseCurrentMatchCount();
    this.selectedCards[0].match();
    this.selectedCards[1].match();
    document.getElementById(`card${this.selectedCards[0].cardNumber}`).remove();
    document.getElementById(`card${this.selectedCards[1].cardNumber}`).remove();
    this.matchedCards = this.selectedCards;
    this.selectedCards = [];
    this.flippedOver = 0;
  }

  chooseCurrentMatchCount() {
    if (this.currentTurn === this.playerOne) {
      this.playerOne.matchCount += 1;
      this.currentGameMatches += 1;
      document.getElementById('player-one-matches').innerHTML = this.playerOne.matchCount;
    } else {
      this.playerTwo.matchCount += 1;
      this.currentGameMatches += 1;
      document.getElementById('player-two-matches').innerHTML = this.playerTwo.matchCount;
    }
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

  switchPlayerTurn() {
    var p1area = document.getElementById('player-one-area')
    var p2area = document.getElementById('player-two-area');
    if (this.currentTurn === this.playerTwo) {
      this.currentTurn = this.playerOne;
      p2area.innerHTML = this.playerTwo.name;
      p2area.classList.remove('green-background');
      p1area.classList.add('green-background');
      p1area.insertAdjacentHTML('beforeend', `
      <p>IT'S YOUR TURN!</p>`);
    } else {
      this.currentTurn = this.playerTwo;
      p1area.innerHTML = this.playerOne.name;
      p1area.classList.remove('green-background');
      p2area.classList.add('green-background');
      p2area.insertAdjacentHTML('beforeend', `
      <p>IT'S YOUR TURN!</p>`);
    }
  }

  findWinner() {
    if (this.playerTwo.matchCount > this.playerOne.matchCount) {
      this.winner = this.playerTwo;
    } else {
      this.winner = this.playerOne;
    }
  }
}
