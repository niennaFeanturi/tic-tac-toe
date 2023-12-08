// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const checkGame = require("./checkGame");
const createGame = require("./createGame");
const fetchGame = require("./fetchGame");
const performMove = require("./performMove");
const handlePostMoveNotification = require('./handlePostMoveNotification')

module.exports = {
  checkGame,
  createGame,
  fetchGame,
  performMove,
  handlePostMoveNotification
};
