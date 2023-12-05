// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const AWS = require('aws-sdk')
const documentClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'})

const performMove = async ({ gameId, user, row, col, entry}) => {
  const params = {
    TableName: 'tictactoe-db',
    Key: {
      gameId: gameId
    },
    UpdateExpression: `SET lastMoveBy = :user, move = move + :1, board[${row}][${col}] = :entry`,
    ConditionExpression: `(user1 = :user OR user2 = :user) AND NOT (lastMoveBy = :user) AND board[${row}][${col}] = :empty AND move < :moveLimit`,
    ExpressionAttributeValues: {
      ":user": user,
      ":entry": entry,
      ":empty" : " ",
      ":1" : 1,
      ":moveLimit" : 9
    },
    ReturnValues: 'ALL_NEW'
  };
  
  try {
    const resp = await documentClient.update(params).promise()
    return resp.Attributes;
  } catch (error) {
    console.log('Error updating item: ', error.message);
    throw new Error('Could not perform move');
  }
};

performMove({ gameId: '5b5ee7d8', user: 'p2', row: 2, col: 1, entry: 'O'})
