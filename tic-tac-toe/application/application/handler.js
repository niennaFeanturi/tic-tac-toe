// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const awsServerlessExpress = require("aws-serverless-express");
const app = require("./app");
const server = awsServerlessExpress.createServer(app);

// Function to handle the "/users" endpoint
const {createCognitoUser} = require("./auth.js"); // Import necessary data handling functions
const {fetchGame} = require("./data/fetchGame.js");


async function usersHandler(req, res) {
  const { username, password, email, phoneNumber } = req.body;

  // Perform user creation logic
  const user = await createCognitoUser(username, password, email, phoneNumber);

  // Return the result
  res.json(user);
}



exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};
