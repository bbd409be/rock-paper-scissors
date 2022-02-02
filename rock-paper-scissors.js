const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const pairs = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper',
};

async function playGame() {
  console.log('Rock, Paper, Scissors! Game ON!!!');

  const p1 = await getPlayerInput('Player 1: ');
  const p2 = await getPlayerInput('Player 2: ');

  if (pairs[p1] === p2) {
    console.log(
      `Player 1 (${capitalizeString(
        p1
      )}) won the game against Player 2 (${capitalizeString(p2)})`
    );
  } else if (pairs[p2] === p1) {
    console.log(
      `Player 2 (${capitalizeString(
        p2
      )}) won the game against Player 1 (${capitalizeString(p1)})`
    );
  } else {
    console.log('Draw!');
  }

  rl.close();
}

function question(str) {
  return new Promise((resolve) => rl.question(str, resolve));
}

function validateInput(str) {
  return pairs[str.toLowerCase()] !== undefined;
}

function capitalizeString(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function clearLastLine() {
  process.stdout.moveCursor(0, -1);
  process.stdout.clearLine(1);
}

async function getPlayerInput(str) {
  let inputValid = false;
  let input;

  while (!inputValid) {
    input = await question(str);
    clearLastLine();

    if (validateInput(input)) {
      console.log('Valid input provided!');
      inputValid = true;
    } else {
      console.log(
        'Please provide a valid input or quite the game by pressing Ctrl + C'
      );
    }
  }

  return input.toLowerCase();
}

playGame();
