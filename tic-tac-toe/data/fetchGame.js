// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

const fetchGame = async gameId => {
  const params = {
    TableName: "tictactoe-db",
    KeySchema: [
      {AttributeName: "gameId", KeyType: "HASH"},
      {AttributeName: "moveId", KeyType: "RANGE"}
    ],

    AttributeDefinitions: [
      {AttributeName: "gameId", AttributeType: "S"},
      {AttributeName: "moveId", AttributeType: "N"}
    ]
  };

  try {
    const game = await documentClient.get(params).promise();
    return game.Item;
  } catch (error) {
    console.log("Error fetching game: ", error.message);
    throw new Error("Could not fetch game");
  }
};

module.exports = fetchGame;
