// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const sendMessage = require('./sendMessage')

const handlePostMoveNotification = async ({ board, mover, opponent }) => {

  const{won, draw} = board;
  // Handle when game is finished& won
  if (won) {
    const winnerMessage = `You beat ${mover.username} in a game of Tic-Tac-Toe!`
    const loserMessage = `Ahh, you lost to ${opponent.username} in a game of Tic-Tac-Toe.`
    await Promise.all([
      sendMessage({ phoneNumber: opponent.phoneNumber, message: winnerMessage }),
      sendMessage({ phoneNumber: mover.phoneNumber, message: loserMessage })
    ])

    return
  }

  if(board.draw){
    const player1Message = `Your game with ${mover.username} has come to a draw!`
    const player2Message = `Your game with ${opponent.username} has come to a draw!`
    await Promise.all([
      sendMessage({ phoneNumber: opponent.phoneNumber, message: player1Message }),
      sendMessage({ phoneNumber: mover.phoneNumber, message: player2Message })
    ])

    return
  }

  const message = `${mover.username} has moved. It's your turn next in Game ID ${game.gameId}!`
  await sendMessage({ phoneNumber: opponent.phoneNumber, message })
};

module.exports = handlePostMoveNotification;
