// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const AWS = require('aws-sdk')
const documentClient = new AWS.DynamoDB.DocumentClient()

const performMove = async ({ gameId, moveId, user, row, col, entry}) => {
  const params = {
    TableName: 't',
    Key: {
      gameId: gameId,
      moveId: moveId + 1
    },
    UpdateExpression: `SET lastMoveBy = :user, game[${row}][${col}] = :entry`,
    ExpressionAttributeValues: {
      ":user": user,
      ":entry": entry
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

performMove({ gameId: '5b5ee7d8', moveId: 2, user: 'theseconduser', row: 3, col: 1, entry: 'X'})
