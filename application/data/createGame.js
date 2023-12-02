// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});
const uuidv4 = require("uuid/v4");
const sendMessage = require("./sendMessage");

const createGame = async ({ creator, opponent }) => {
  const params = {
    TableName: "tictactoe-db",
    Item: {
      gameId: uuidv4().split('-')[0],
      move: 0,
      user1: creator,
      user2: opponent.username,
      board: [
      [" "," "," "],
      [" "," "," "],
      [" "," "," "]
      ],
      lastMoveBy: creator
    }
  };

  try {
    await documentClient.put(params).promise();
  } catch (error) {
    console.log("Error creating game: ", error.message);
    throw new Error("Could not create game");
  }

  const message = `Hi ${opponent.username}. Your friend ${creator} has invited you to a new game! Your game ID is ${params.Item.gameId}`;
  try {
    await sendMessage({ email: opponent.email, message: message , subject: "You're Invited to Play!"});
  } catch (error) {
    console.log("Error sending message: ", error.message);
    throw new Error("Could not send message to email: ");
  }

  return params.Item;
};

module.exports = createGame;
