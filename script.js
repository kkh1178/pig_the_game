'use strict';

// Selecting the elements to calculate the score
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

// Selecting the elements that we will need to switch the background color
// based on the active player
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// Elements for the dice image
const diceEl = document.querySelector('.dice');

// Elements for the buttons
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');

// Declaring empty variables outside of the function since let values are scoped and not
// available outside of the function so you can't declare them inside.
let score, currentScore, activePlayer, playing;

function initializeGame() {
  // Starting values for the score. Score array for the overall score per player;
  // current score depending on which player is active; we set the active player in the
  // if else statement below
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  // Variable to set the state of the game (whether or not we are still playing)
  playing = true;

  // starting conditions; Score text is zero and the dice is initially hidden
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  diceEl.classList.add('hidden');

  // resetting the class lists to remove the winner if its there and resetting
  // player 0 to the active player
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
}
// START THE GAME!!
initializeGame();

// function to switch the player
function switchPlayer() {
  // Set the current score to 0 and display it
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // Switch the player
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Change the background color based on the active player
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

// Function for user rolling the dice
roll.addEventListener('click', function () {
  // If playing is set to true, then you can play the game
  if (playing) {
    // 1. Random number generator for the dice
    let dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2. display the dice by removing the hidden class
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check if it is a one or not
    if (dice !== 1) {
      // add the dice to the current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;

      // NOTE - change later based on the current player
    } else {
      // Current score is 0 and switch to the next player

      switchPlayer();
    }
  }
});

// Adding an event handler for holding the score:
hold.addEventListener('click', function () {
  if (playing) {
    // 1. add the score to the active players overall score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // 2. check to see if the score is 100
    if (score[activePlayer] >= 100) {
      // finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3. switch to the other player of score hasn't reached 100
      switchPlayer();
    }
  }
});

newGame.addEventListener('click', function () {
  // if the player confirms that they want to start a new game, then reset everything to
  // zero; else do nothing
  if (
    confirm('Do you want to start a new game? Your scores will be deleted.')
  ) {
    initializeGame();
  }
});
