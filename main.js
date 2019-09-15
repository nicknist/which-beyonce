var initialPlay = document.querySelector('#initialPlay');
var main = document.querySelector('main');
var body = document.querySelector('body');
var playerOneInput = document.querySelector('#player-one-input');
var playerTwoInput = document.querySelector('#player-two-input');
var errorOneTooMany = document.getElementById('error-message-one-too-many');
var errorOneBlank = document.getElementById('error-message-one-blank');
var deck = null;

main.addEventListener('click', mainClickOperators);

main.addEventListener('keyup', typingOperators);

//need main keyup function to enable buttons.... at some point

function mainClickOperators(event) {
  playGameButton(event);
}

function typingOperators() {
  if (playerOneInput.value.length < 33) {
    errorOneBlank.classList.remove('display-show');
    errorOneTooMany.classList.remove('display-show');
    playerOneInput.classList.remove('error-box');
  } else if(playerOneInput.value === '') {
    errorOneBlank.classList.remove('display-show');
    playerOneInput.classList.remove('error-box');
  } else if (playerOneInput.value.length > 32){
    errorOneTooMany.classList.add('display-show');
    playerOneInput.classList.add('error-box');
  }
}

function playGameButton(event) {
  if (event.target.classList.contains('play-game-button') && playerOneInput.value.length < 33 && playerOneInput.value != '') {
    pageTwoSwitch();
  } else if (playerOneInput.value === '') {
    errorOneTooMany.classList.remove('display-show');
    errorOneBlank.classList.add('display-show');
    playerOneInput.classList.add('error-box');
  }

  if (event.target.id === 'second-play-button') {
    instantiateDeck();
    instantiateCards();
    pageThreeSwitch();
  }

  if (event.target.classList.contains('guess-card')) {
    changeGuessCard();
  }
}


function pageTwoSwitch() {
  main.innerHTML = '';
  main.innerHTML += `
    <form class="second-page-form">
      <h2>WELCOME ${playerOneInput.value} AND ${playerTwoInput.value}</h2>
      <p>The goal of the game is to find all 5 pairs of cards as quickly as possible. The player that finds the greatest number of pairs, wins.</p>
      <p>To begin playing, the player whose name is highlighted can click any card in the pile. It will flip over and reveal a picture of Beyonce. Click another card. If they match, they will disappear and you will have completed a match! If they don't, you'll have three seconds to look at them before they flip over. Then it's time for the other player to try!</p>
      <p>After you play, you'll see the name of the final winner and how long it took to win the game.</p>
      <button type="button" name="button" class="play-game-button" id="second-play-button">Play Game</button>
    </form>`;
}

function pageThreeSwitch() {
  body.classList.add('background-gray');
  body.classList.remove('background-image');
  main.innerHTML = '';
  main.innerHTML += `
    <div class="third-page-sections">
      <section id="player-one-section" class="player-section">
      <h4>${deck.playerOneName}</h4>
      <div class="player-section-line"></div>
      <p>Matches This Round</p>
      <h1 class="number-of-matches" id="player-one-matches">${deck.matches}</h1>
      <div class="player-section-line"></div>
      <ul class="game-wins">
        Game Wins
      </ul>
      </section>
      <section class="card-section">
        <div class="guess-card" id="card${deck.cards[0].cardNumber}">${deck.cards[0].cardNumber}</div>
        <div class="guess-card" id="card${deck.cards[1].cardNumber}">${deck.cards[1].cardNumber}</div>
        <div class="guess-card" id="card${deck.cards[2].cardNumber}">${deck.cards[2].cardNumber}</div>
        <div class="guess-card" id="card${deck.cards[3].cardNumber}">${deck.cards[3].cardNumber}</div>
        <div class="guess-card" id="card${deck.cards[4].cardNumber}">${deck.cards[4].cardNumber}</div>
        <div class="guess-card" id="card${deck.cards[5].cardNumber}">${deck.cards[5].cardNumber}</div>
        <div class="guess-card" id="card${deck.cards[6].cardNumber}">${deck.cards[6].cardNumber}</div>
        <div class="guess-card" id="card${deck.cards[7].cardNumber}">${deck.cards[7].cardNumber}</div>
        <div class="guess-card" id="card${deck.cards[8].cardNumber}">${deck.cards[8].cardNumber}</div>
        <div class="guess-card" id="card${deck.cards[9].cardNumber}">${deck.cards[9].cardNumber}</div>
      </section>
      <section id="player-two-section" class="player-section">
        <h4>${deck.playerOneName}</h4>
        <div class="player-section-line"></div>
        <p>Matches This Round</p>
        <h1 class="number-of-matches" id="player-two-matches">?</h1>
        <div class="player-section-line"></div>
        <ul class="game-wins">
          Game Wins
        </ul>
      </section>
    </div>`;
}

function pageCongratsSwitch(time) {
  main.innerHTML = '';
  main.innerHTML += `
    <form class="second-page-form">
      <h2>CONGRATULATIONS ${playerOneInput.value}</h2>

      <p class="congrats-gif">It took you ${time} to complete the thing!</p>

      <p class="congrats-gif"><iframe src="https://giphy.com/embed/XreQmk7ETCak0" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></p>

    </form>`;
}

function instantiateCards() {
  //do things and stuff
  //go through 10 cards -> for each card it's going to give it a pic name, id 1-10, and start with other default stuff
  for (var i = 0; i < deck.possibleCards.length; i++) {
    var card = new Card(deck.possibleCards[i], deck.possiblePictures[i]);
    deck.cards.push(card);
  }
}

function instantiateDeck() {
  deck = new Deck(playerOneInput.value, playerTwoInput.value);
}

function changeGuessCard() {
  var number = event.target.id;
  number = (number.charAt(4) + number.charAt(5));
  if (deck.flippedOver <= 1 && deck.cards[number-1].isFlipped === false) {
    flipCardToPicture(number);
  } else if (deck.cards[number-1].isFlipped) {
    flipCardToNumber(number);
  }
  deck.checkSelectedCards();
  if (deck.matches === 5) {
    var finishTime = new Date();
    var seconds = finishTime - deck.startTime;
    seconds = Math.floor(seconds/1000);
    // var minutes = (seconds % 3600);
    var time = ` minutes and ${seconds} seconds`;
    pageCongratsSwitch(time);
  }
}

function flipCardToPicture(number) {
  event.target.innerHTML = '';
  event.target.style.background = `url(${deck.cards[number - 1].picture}) no-repeat`;
  event.target.style.backgroundSize = 'cover';
  deck.cards[number-1].flip();
  deck.flippedOver += 1;
}

function flipCardToNumber(number) {
  event.target.innerHTML = `${deck.cards[number-1].cardNumber}`;
  event.target.style.background = 'none';
  deck.cards[number-1].flip();
  deck.flippedOver -= 1;
}
