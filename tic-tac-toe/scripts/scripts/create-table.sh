# Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: MIT-0
aws dynamodb create-table \
   --table-name tictactoe-db \
   --attribute-definitions '[
  {
    "AttributeName": "gameId",
    "AttributeType": "S"
  }
]' \
--key-schema '[
  {
    "AttributeName": "gameId",
    "KeyType": "HASH"
  }
]' \
--provisioned-throughput '{
  "ReadCapacityUnits": 5,
  "WriteCapacityUnits": 5
}'
