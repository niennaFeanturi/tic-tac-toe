// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const AWS = require('aws-sdk')
const documentClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'})

const performMove = async ({ gameID, player, row, col, entry}) => {
  const params = {
    TableName: 'tictactoe-db',
    Key: {
      gameID: gameID
    },
    UpdateExpression: `SET lastMoveBy = :player, move = move + :1, gameTable[${row}][${col}] = :entry`,
    ConditionExpression: `(player1 = :player OR player2 = :player) AND NOT (lastMoveBy = :player) AND gameTable[${row}][${col}] = :empty AND move < 9`,
    ExpressionAttributeValues: {
      ":player": player,
      ":entry": entry,
      ":empty" : " ",
      ":1" : 1,
    },
    ReturnValues: 'ALL_NEW'
  }
  try {
    const resp = await documentClient.update(params).promise()
    console.log('Updated game: ', resp.Attributes)
  } catch (error) {
    console.log('Error updating item: ', error.message)
  }
}

performMove({ gameID: '5b5ee7d8', player: 'p2', row: 2, col: 1, entry: 'O'})
