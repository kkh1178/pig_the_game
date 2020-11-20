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
const hold = document.querySelector('.bnt--hold');
const newGame = document.querySelector('.btn--new');

// starting conditions
score0.textContent = 0;
score1.textContent = 0;
diceEl.classList.add('hidden');

// Starting values for the score. Score array for the overall score per player;
// current score depending on which player is active; we set the active player in the
// if else statement below
const score = [0, 0];
let currentScore = 0;
let activePlayer = 0;

// Function for user rolling the dice
roll.addEventListener('click', function () {
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
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
  }
});
