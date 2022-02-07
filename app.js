'use strict';

alert("View in Desktop Mode");

// Selecting Elements
const score01 = document.querySelector('#score--0');
const score02 = document.getElementById('score--1');
const dice01 = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current00 = document.getElementById('current--0');
const current01 = document.getElementById('current--1');

//Variables
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//Starting Conditions
score01.textContent = 0;
score02.textContent = 0;
dice01.classList.add('hidden');

//Functions
//Switch Player
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
}

//Rolling Dice
const rollDice = function () {
    if (playing) {
        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        //2. Display Dice
        dice01.classList.remove('hidden');
        console.log(dice);
        dice01.src = `dice-${dice}.png`;
        //3. Check for rolled 1: if true, switch to next player.
        if (dice !== 1) {
            //Add dice number to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore; 
        } else {
            //Switch to next player
            switchPlayer();
        }
    }
}

//Holding Total Scores
const holdScore = function () {
    if (playing) {
        //1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //2. Check if player's score is >= 100
        if (scores[activePlayer] >= 30) {
            //Finish the game
            dice01.classList.add('hidden');
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            //Switch to the next player
            switchPlayer();
        }
    }
}

//Resetting the game
const newGame = function () {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    document.querySelector(`.player--0`).classList.add('player--active');
    scores = [0, 0];
    score01.textContent = 0;
    score02.textContent = 0;
    activePlayer = 0;
    playing = true;
}


//Event Listeners
//Rolling Dice
btnRoll.addEventListener('click', rollDice);
//Hold Scores
btnHold.addEventListener('click', holdScore);
//New Game
btnNew.addEventListener('click' , newGame);
