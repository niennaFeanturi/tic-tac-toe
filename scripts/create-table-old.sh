# Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: MIT-0
aws dynamodb create-table \
   --table-name tictactoe-db \
   --attribute-definitions '[
  {
    "AttributeName": "gameId",
    "AttributeType": "S"
  },
  {
    "AttributeName": "moveId",
    "AttributeType": "N"
  },
  {
    "AttributeName": "user1",
    "AttributeType": "S"
  },
  {
    "AttributeName": "user2",
    "AttributeType": "S"
  },
  {
    "AttributeName": "entry",
    "AttributeType": "S"
  },
  {
    "AttributeName": "row",
    "AttributeType": "N"
  },
  {
    "AttributeName": "column",
    "AttributeType": "N"
  },
  {
    "AttributeName": "lastMoveBy",
    "AttributeType": "S"
  }
]' \
--key-schema '[
  {
    "AttributeName": "gameId",
    "KeyType": "HASH"
  },
  {
    "AttributeName": "moveId",
    "KeyType": "RANGE"
  }
]' \
--provisioned-throughput '{
  "ReadCapacityUnits": 5,
  "WriteCapacityUnits": 5
}'
