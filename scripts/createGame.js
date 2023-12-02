// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const AWS = require('aws-sdk')
const documentClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'})

const params = {
  TableName: 'tictactoe-db',
  Item: {
    gameID: '5b5ee7d8',
    move: 1,
    player1: 'p1',
    player2: 'p2',
    lastMoveBy: 'p1',
    gameTable: [
      [" "," "," "],
      [" "," "," "],
      ["X"," "," "]
    ],
  }
}

documentClient.put(params).promise()
  .then(() => console.log('Game added successfully!'))
  .catch((error) => console.log('Error adding game', error))
