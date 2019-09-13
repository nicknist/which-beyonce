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
    pageThreeSwitch();
    instantiateDeck();
    instantiateCards();
  }

  if (event.target.classList.contains('guess-card')) {
    changeGuessCard();
  }
}


function pageTwoSwitch() {
  var p1Input = playerOneInput.value;
  main.innerHTML = '';
  main.innerHTML += `
    <form class="second-page-form">
      <h2>WELCOME ${p1Input} AND PLAYER TWO</h2>
      <p>The goal of the game is to find all 5 pairs of cards as quickly as possible. The player that finds the greatest number of pairs, wins.</p>
      <p>To begin playing, the player whose name is highlighted can click any card in the pile. It will flip over and reveal a picture of Beyonce. Click another card. If they match, they will disappear and you will have completed a match! If they don't, you'll have three seconds to look at them before they flip over. Then it's time for the other player to try!</p>
      <p>After you play, you'll see the name of the final winner and how long it took to win the game.</p>
      <button type="button" name="button" class="play-game-button" id="second-play-button">Play Game</button>
    </form>`;
}

function pageThreeSwitch() {
  // var p1name? and p2name?
  body.classList.add('background-gray');
  body.classList.remove('background-image');
  main.innerHTML = '';
  main.innerHTML += `
    <div class="third-page-sections">
      <section id="player-one-section" class="player-section">
      <h4>Player Name!</h4>
      <div class="player-section-line"></div>
      <p>Player Name Wins!</p>
      <h1 class="number-of-matches">?</h1>
      <div class="player-section-line"></div>
      <ul class="game-wins">
        Game Wins
      </ul>
      </section>
      <section class="card-section">
        <div class="guess-card" id="card1">1</div>
        <div class="guess-card" id="card2">2</div>
        <div class="guess-card" id="card3">3</div>
        <div class="guess-card" id="card4">4</div>
        <div class="guess-card" id="card5">5</div>
        <div class="guess-card" id="card6">6</div>
        <div class="guess-card" id="card7">7</div>
        <div class="guess-card" id="card8">8</div>
        <div class="guess-card" id="card9">9</div>
        <div class="guess-card" id="card10">10</div>
      </section>
      <section id="player-two-section" class="player-section">
        <h4>Player Name!</h4>
        <div class="player-section-line"></div>
        <p>Player Name Wins!</p>
        <h1 class="number-of-matches">?</h1>
        <div class="player-section-line"></div>
        <ul class="game-wins">
          Game Wins
        </ul>
      </section>
    </div>`;
}

function instantiateCards() {
  //do things and stuff
}

function instantiateDeck() {
  deck = new Deck(playerOneInput.value, playerTwoInput.value);
}

function changeGuessCard() {
  event.target.innerHTML = '';
  event.target.classList.add('card-image');
}
