//document.getElementById('');

class Game {
  constructor() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
    this.hintlock = 0;
  }
  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
  }
  isLower() {
    if (this.playersGuess < this.winningNumber) {
      return true;
    } else {
      return false;
    }
  }
  playersGuessSubmission(num) {
    if (num >= 1 && num <= 100 && typeof num === 'number') {
      this.playersGuess = num;
      return this.checkGuess();
    } else {
      let error = 'That is an invalid guess.';
      alert(error);
    }
  }
  checkGuess() {
    let feedbackText = '';
    if (this.playersGuess === this.winningNumber) {
      this.pastGuesses.push(this.playersGuess);
      feedbackText = `You Win! The answer was ${this.winningNumber}.`;
    } else if (this.pastGuesses.includes(this.playersGuess)) {
      feedbackText = 'You have already guessed that number.';
    } else {
      //new guess
      this.pastGuesses.push(this.playersGuess);
      if (this.pastGuesses.length === 5) {
        feedbackText = `You Lose. The answer was ${this.winningNumber}.`;
      } else if (this.difference() < 10) {
        feedbackText = "You're burning up! The answer is within 10.";
      } else if (this.difference() < 25) {
        feedbackText = "You're lukewarm. The answer is within 25.";
      } else if (this.difference() < 50) {
        feedbackText = "You're a bit chilly. The answer is within 50.";
      } else if (this.difference() < 100) {
        feedbackText = "You're ice cold! The answer is far away.";
      }
    }
    document.querySelector('#guess-feedback > h2').innerHTML = feedbackText;
    document.querySelector(
      `#guess-list li:nth-child(${this.pastGuesses.length})`
    ).innerHTML = this.playersGuess;
    return feedbackText;
  }
  provideHint() {
    this.hintlock++;
    const array = [];
    array.push(this.winningNumber);
    array.push(generateWinningNumber());
    array.push(generateWinningNumber());
    return shuffle(array);
  }
}

function generateWinningNumber() {
  return Math.ceil(Math.random() * 100);
}

function shuffle(array) {
  var m = array.length,
    t,
    i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

function newGame() {
  return new Game();
}

function playGame() {
  let game = newGame();
  const button = document.getElementById('submit');
  const restart = document.getElementById('startagain');
  const hinter = document.getElementById('needahint');

  restart.addEventListener('click', function() {
    game = newGame();
    document.querySelector('#guess-feedback > h2').innerHTML = null;
    document.querySelector('#guess-list li').innerHTML = '-';
  });

  hinter.addEventListener('click', function() {
    if (game.hintlock < 1) {
      // eslint-disable-next-line no-alert
      alert(
        `The answer is either ${game.provideHint()[0]}, ${
          game.provideHint()[1]
        }, or ${game.provideHint()[2]}.`
      );
    } else {
      // eslint-disable-next-line no-alert
      alert('no more hints!');
    }
  });

  button.addEventListener('click', function() {
    const playersGuess = +document.querySelector('input').value;
    document.querySelector('input').value = '';
    game.playersGuessSubmission(playersGuess);
  });
}
playGame();
