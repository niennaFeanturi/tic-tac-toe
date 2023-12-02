// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const sendMessage = require('./sendMessage')

//entry is set before move is updated,
//so use opposite entry after move is posted to check for win
const checkGame = async (game) => {
  let win = false;
  let gameState = "ongoing";
  let entry = parseInt(game.move)%2 === 0 ? "O" : "X";
  let b = await game.board;
  let r1 = await b[0];
  let r2 = await b[1];
  let r3 = await b[2];
  let c1 = await [b[0][0],b[1][0],b[2][0]];
  let c2 = await [b[0][1],b[1][1],b[2][1]];
  let c3 = await [b[0][2],b[1][2],b[2][2]];
  let d1 = await [b[0][0],b[1][1],b[2][2]];
  let d2 = await [b[0][2],b[1][1],b[2][0]];
  let lines = await [r1,r2,r3,c1,c2,c3,d1,d2];
  for (let i = 0; i < 8; i++) {
    let l = await lines[i];
    if (l[0]==entry && l[1]==entry && l[2]==entry) win = true;
  }
  if (win) gameState = "won";
  else if (game.move === 9) gameState = "draw";
  return gameState;
}
const handlePostMoveNotification = async ({ game, mover, opponent }) => {

  const gameState = await checkGame(game);
  // Handle when game is finished& won
  if (gameState == "won") {
    const winSubject = "Game Over: You Win!"
    const loseSubject = "Game Over: You Lost!"
    const winnerMessage = `You beat ${opponent.username} in a game of Tic-Tac-Toe!`
    const loserMessage = `Ahh, you lost to ${mover.username} in a game of Tic-Tac-Toe.`
    await Promise.all([
      sendMessage({ email: mover.email, message: winnerMessage, subject: winSubject  }),
      sendMessage({ email: opponent.email, message: loserMessage, subject: loseSubject })
    ])

    return
  }

  else if(await gameState === "draw") {
    const drawSubject = "Game Over: Draw!"
    const player1Message = `Your game with ${opponent.username} has come to a draw!`
    const player2Message = `Your game with ${mover.username} has come to a draw!`
    await Promise.all([
      sendMessage({ email: mover.email, message: player1Message, subject: drawSubject  }),
      sendMessage({ email: opponent.email, message: player2Message,subject: drawSubject })
    ])

    return
  }
  else {
    const turnSubject = "Your Turn!"
    const message = `${mover.username} has moved. It's your turn next in Game ID ${game.gameId}!`
    await sendMessage({ email: opponent.email, message, subject: turnSubject})
    return
  }
};

module.exports = handlePostMoveNotification;
