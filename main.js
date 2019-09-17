var initialPlay = document.querySelector('#initialPlay');
var main = document.querySelector('main');
var body = document.querySelector('body');
var header = document.querySelector('header');
var playerOneInput = document.querySelector('#player-one-input');
var playerTwoInput = document.querySelector('#player-two-input');
var errorOneTooMany = document.getElementById('error-message-one-too-many');
var errorOneBlank = document.getElementById('error-message-one-blank');
var navBox = document.getElementById('three-line-box');
var deck = null;

main.addEventListener('click', mainClickOperators);

main.addEventListener('keyup', typingOperators);

navBox.addEventListener('click', headerOperators);

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
  if (event.target.id === 'initial-play-button' && playerOneInput.value.length < 33 && playerOneInput.value != '') {
    pageTwoSwitch();
  } else if (playerOneInput.value === '') {
    errorOneTooMany.classList.remove('display-show');
    errorOneBlank.classList.add('display-show');
    playerOneInput.classList.add('error-box');
  }

  if (event.target.id === 'second-play-button' || event.target.id === 'restart-game-button-same-names') {
    instantiateDeck();
    deck.shuffle();
    pageThreeSwitch();
  }

  if (event.target.classList.contains('guess-card')) {
    changeGuessCard();
  }

  if (event.target.id === 'restart-game-button') {
    originalPageSwitch();
  }
}

function headerOperators() {
  console.log('click');
  if (document.getElementById('leader-board') === null) {
    body.insertAdjacentHTML('afterbegin', `
      <section id="leader-board" class="leader-board player-section">
      <h4 class="leader-board-title">LeaderBoard</h4>
      <div class="player-section-line leader-board-line"></div>
      <ol id="current-leaders">
      </ol>
      </section>`);
    createLeaderPositions();
  } else {
    console.log('we in');
    document.getElementById('leader-board').remove();
  }
}

function createLeaderPositions() {
  if (JSON.parse(localStorage.getItem("leaderBoard") !== null)) {
    var currentBoard = JSON.parse(localStorage.getItem("leaderBoard"));
    var leaderList = document.getElementById('current-leaders');
      for (var i = 0; i < currentBoard.length; i++) {
        leaderList.innerHTML += `
          <li class="leader-list-item">
            <p>${currentBoard[i].name}</p>
            <p>Time: ${currentBoard[i].time}</p>
          </li>
        `;
      }
  }
}

function originalPageSwitch() {
  main.innerHTML = '';
  body.classList.add('background-image');
  main.innerHTML += `
  <form class="initial-page-form">
    <div class="player-input input1">
      <input class="player-input" id="player-one-input" type="text" name="Player One Input" placeholder="Enter yo name">
      <label for="Player One Input">Player One</label>
      <p id="error-message-one-too-many" class="error-message">Error - Too Many Characters!</p>
      <p id="error-message-one-blank" class="error-message">You haven't entered anything!</p>
    </div>
    <div class="player-input input2">
      <input class="player-input" id="player-two-input" type="text" name="Player Two Input" placeholder="Enter yo name">
      <label for="Player Two Input">Player Two</label>
      <p id="error-message-two-too-many" class="error-message">Error - Too Many Characters!</p>
      <p id="error-message-two-blank" class="error-message">You haven't entered anything!</p>
    </div>
    <button class="play-game-button" id="initial-play-button" type="button" name="button">Play Game</button>
  </form>`;
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
  localStorage.setItem("playerOneName", deck.playerOne.name);
  localStorage.setItem("playerTwoName", deck.playerTwo.name);
  main.innerHTML = '';
  main.classList.add('third-page');
  main.innerHTML += `
      <section id="player-one-section" class="player-section">
      <h4 id="player-one-area" class="green-background">${deck.playerOne.name}<br /><p id="spot-to-insert">IT'S YOUR TURN!</p></h4>
      <div class="player-section-line"></div>
      <p>Matches This Round</p>
      <h1 class="number-of-matches" id="player-one-matches">${deck.playerOne.matchCount}</h1>
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
        <h4 id="player-two-area">${deck.playerTwo.name}<br /><p id="p1-turn"></p></h4>
        <div class="player-section-line"></div>
        <p>Matches This Round</p>
        <h1 class="number-of-matches" id="player-two-matches">${deck.playerTwo.matchCount}</h1>
        <div class="player-section-line"></div>
        <ul class="game-wins">
          Game Wins
        </ul>
      </section>`;
    checkPastWinner();
}

function pageCongratsSwitch() {
  if (deck.currentGameMatches === 5) {
    var finishTime = new Date();
    var seconds = finishTime - deck.startTime;
    seconds = Math.floor(seconds/1000);
    var minutes = Math.floor(seconds/60);
    seconds = seconds % 60;
    var time = `${minutes} minutes and ${seconds} seconds`;
    deck.findWinner();
    makeLeaderBoard(seconds);
    main.innerHTML = '';
    main.classList.remove('third-page');
    main.innerHTML += `
      <form class="second-page-form">
        <h2>CONGRATULATIONS ${deck.winner.name}</h2>
        <p class="congrats-gif">It took you ${time} to complete the thing!</p>
        <p class="congrats-gif"><iframe src="https://giphy.com/embed/XreQmk7ETCak0" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></p>
        <div class="replay-buttons">
          <button type="button" name="button" class="play-game-button" id="restart-game-button">New Game</button>
          <button type="button" name="button" class="play-game-button" id="restart-game-button-same-names">Play Again with Same Names</button>
        </div>
      </form>`;
  }
}

function instantiateDeck() {
  var playerOne = new Player(playerOneInput.value);
  var playerTwo = new Player(playerTwoInput.value);
  deck = new Deck(playerOne, playerTwo);
}

function changeGuessCard() {
  var number = event.target.id;
  number = (number.charAt(4) + number.charAt(5));
  if (deck.flippedOver <= 1 && deck.cards[number-1].isFlipped === false) {
    flipCardToPicture(number);
  }
  if (deck.selectedCards.length === 2) {
    setTimeout(checkTheCards, 800);
    setTimeout(pageCongratsSwitch, 800);
    setTimeout(flipTheCardsBack, 1500);
    setTimeout(switchTheTurns, 1500);
  }
}

function flipCardToPicture(number) {
  event.target.innerHTML = '';
  event.target.style.background = `url(${deck.cards[number - 1].picture}) no-repeat`;
  event.target.style.backgroundSize = 'cover';
  event.target.classList.remove('flip-vertical-bck');
  event.target.classList.add('flip-horizontal-bottom');
  deck.cards[number-1].flip();
  deck.flippedOver += 1;
}

function checkTheCards() {
  deck.checkSelectedCards();
}

function flipTheCardsBack() {
  deck.flipCardsBack();
}

function switchTheTurns() {
  if (deck.currentGameMatches < 5) {
    deck.switchPlayerTurn();
  }
}

function makeLeaderBoard(time) {
  var blankBoard = [];
  if (JSON.parse(localStorage.getItem("leaderBoard") !== null)) {
    var oldBoard = JSON.parse(localStorage.getItem("leaderBoard"));
    blankBoard = blankBoard.concat(oldBoard);
  }
  var newLeader = {name: deck.winner.name, time: time};
  blankBoard.push(newLeader);
  blankBoard = blankBoard.sort(compareTime);
  if (blankBoard.length > 5) {
    blankBoard.pop();
  }
  var stringifiedBoard = JSON.stringify(blankBoard);
  localStorage.setItem("leaderBoard", stringifiedBoard);
}

function compareTime(a, b) {
  return a.time - b.time;
}

function checkPastWinner() {
  if (JSON.parse(localStorage.getItem("leaderBoard") !== null)) {
    var oldBoard = JSON.parse(localStorage.getItem("leaderBoard"));
    for (var i = 0; i < oldBoard.length; i++) {
      if (oldBoard[i].name === deck.playerOne.name) {
        document.getElementById('spot-to-insert').insertAdjacentHTML('beforebegin', `
          <img src="images/trophy.jpeg" alt="Trophy for being on the leaderboard!" class="small-trophy">`);
      } else if (oldBoard[i].name === deck.playerTwo.name) {
        document.getElementById('player-two-area').insertAdjacentHTML('beforeend', `
          <img src="images/trophy.jpeg" alt="Trophy for being on the leaderboard!" class="small-trophy">`);
      }
    }
  }
}
