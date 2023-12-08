// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const sendMessage = require('./sendMessage')


const handlePostMoveNotification = async ({ game, mover, opponent }) => {


  if (await game.winner != " ") {
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

  else if(await game.move === 9 && game.winner === " ") {
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
