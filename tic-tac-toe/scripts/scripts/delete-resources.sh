# Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: MIT-0
source env.sh

echo "Removing REST API"
REST_API_ID=$(aws apigateway get-rest-apis \
  --query 'items[?name==`Tictactoe API`].id' \
  --output text)

API=$(aws apigateway delete-rest-api \
  --rest-api-id ${REST_API_ID})

echo "Deleting IAM role"
POLICY=$(aws iam delete-role-policy \
  --role-name Cloud9-tictactoe-api-lambda-role \
  --policy-name lambda-policy)

ROLE=$(aws iam delete-role \
  --role-name Cloud9-tictactoe-api-lambda-role)

echo "Deleting Lambda function"
FUNCTION=$(aws lambda delete-function \
  --function-name tictactoe-api)

