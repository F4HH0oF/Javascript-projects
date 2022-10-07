'use strict';

//Variable declaration/initialization
let secretNumber;
let score = 20;
let highscore = 0;

//---Functions
const newSecretNumber = function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  //Math.random() * 20 - (0;20)
};

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};
//---

newSecretNumber(); //Creating the secret number
displayScore(score);
document.querySelector('.number').textContent = '?';
document.querySelector('.highscore').textContent = highscore;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  if (!guess) displayMessage('⛔ No number!');
  else if (guess === secretNumber) {
    displayMessage('🎉 Correct number!');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (guess !== secretNumber) {
    displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
    score--;
    displayScore(score);
  } else {
    displayMessage('💥 You lost!');
    document.querySelector('.score').textContent = 0;
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  newSecretNumber();
  displayMessage('Start guessing...');
  document.querySelector('.guess').value = '';
  displayScore(score);
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';
});
