let prompt = require('prompt');
let Promise = require('bluebird');

prompt.start();
let player1;
let player2;
let count = 0;

let switchTurns = function(playerTurn) {
  if (playerTurn === 'X') {
    console.log(`Player O, you're up!`)
    return 'O'
  } else {
    console.log(`Player X, you're up!`)
    return 'X'
  }
}

let checkIfWinner = function(board, playerTurn) {
  // horizontal win only:

  for (var i = 0; i < board.length; i++) {
    if (board[i].every(function(item){
      return item === playerTurn
    })) {
      console.log(`${playerTurn} is the winner! Final board: ${board}`)
      return true;
    }
  }

  console.log('No winner yet...')
}

let startRound = function(board, playerTurn) {
  console.log(`Player ${playerTurn}! Select an open position between 0-8.\n\nCurrent Board: \n${board[0]}\n${board[1]}\n${board[2]}`);
  prompt.get(['position'], function(err, result) {
    // let temp = result.position;
    // let mark = parseInt(temp);
    let mark = parseInt(result.position);

    if (err) {
      return err;
    }

    // check if valid input
    if (mark < 0 || mark > 8) {
      console.log('Choose a valid input. 0-8 only')
      startRound(board, playerTurn);
    }

    // add the X or O to the board
    for (var i = 0; i < board.length; i++) {
      if (board[i].includes(mark)) {
        let position = board[i].indexOf(mark);
        board[i][position] = playerTurn;
        count++;
        console.log(`Mark added.\n`)
      }
      
      // else {
      //   // if position has already been taken.
      //   console.log('That position has already been taken, try another')
      //   startRound(board, playerTurn);
      // }
    }

    let winner = checkIfWinner(board, playerTurn);
    if (winner) {
      console.log('Game over')
      return;
    } else {
      if (count > 8) {
        console.log('Game over')
        return;
      }
      playerTurn = switchTurns(playerTurn);
      startRound(board, playerTurn);
    }



  })
}

let newGame = function() {
  // getPlayerInfo()
  let newBoard = [[0,1,2],[3,4,5],[6,7,8]];
  console.log(`* * * * * * * * * * * * * * * * * * * *\nWELCOME TO TIC TAC TOE!\nPlayer X will start, followed by Player O.\n* * * * * * * * * * * * * * * * * * * *\n`)
  let playerTurn = 'X'
  startRound(newBoard, playerTurn)
}

newGame();

// game does not account for horizontal or diagonal wins
// does not stop players from placing x or o on occupied position.