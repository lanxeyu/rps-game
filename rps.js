const readline = require('readline');
const colors = require('ansi-colors');

// Create user interface for input and output
const ui = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Create array of possible choices
const choices = ['r', 'p', 's'];
// Map the letter to their corresponding full name
const choiceNames = {
    'r': 'rock',
    'p': 'paper',
    's': 'scissors'
  };


// Initialize score counters
var gameCount = 0
var winCount = 0

// Game loop
function getUserChoice() {
    ui.question('Rock, Paper, Scissors? (r/p/s) ', (userChoice) => {
      if (isValidChoice(userChoice, choices)) {
        playGame(userChoice.toLowerCase());
      } else {
        console.log(' ► Invalid input. Please enter r/p/s only.');
        getUserChoice();
      }
    });
  }

function playGame(userChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(userChoice, computerChoice);
  
    console.log(`You chose ${choiceNames[userChoice]}.`);
    console.log(`Computer chose ${choiceNames[computerChoice]}.`);
    console.log(result);
    
    incGameCount();
    askToPlayAgain();
  }

function askToPlayAgain() {
  ui.question('Play again? (y/n) ', (answer) => {
    if (answer.toLowerCase() === 'y') {
      getUserChoice();
    } else {
        // If no, ask to check score
        ui.question('Check your score? (y/n) ', (answer) => {
            if (answer.toLowerCase() === 'y') {
              displayScore(gameCount, winCount);
              console.log('Thanks for playing!');
              ui.close();
            } else {
              console.log('Thanks for playing!');
              ui.close();
            }
          });   
    }
  });
}
  
function isValidChoice(choice, choices) {
  return choices.includes(choice.toLowerCase());
}

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return colors.yellow(" --- IT'S A TIE! ---\n");
  } else if (
    (userChoice === 'r' && computerChoice === 's') ||
    (userChoice === 'p' && computerChoice === 'r') ||
    (userChoice === 's' && computerChoice === 'p')
  ) {
    incWinCount(winCount);
    return colors.green(' --- YOU WON! ---\n');
  } else {
    return colors.red(' --- YOU LOST! ---\n');
  }
}

function incGameCount() {
    gameCount++
}

function incWinCount() {
    winCount++
}

function displayScore() {
    console.log(`Games played: ${gameCount}. Games won: ${winCount}.`)
}


// Start the game
getUserChoice();
