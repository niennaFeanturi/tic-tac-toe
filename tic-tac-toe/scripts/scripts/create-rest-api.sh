source env.sh

echo "Creating REST API"
REST_API_ID=$(aws apigateway create-rest-api \
  --name 'Tictactoe API' \
  --query 'id' \
  --output text)

echo "Fetching account ID"
ACCOUNT_ID=$(aws sts get-caller-identity \
  --query 'Account' \
  --output text)
  


echo "Fetching root resource"
ROOT_RESOURCE_ID=$(aws apigateway get-resources \
  --rest-api-id ${REST_API_ID} \
  --query 'items[0].id' \
  --output text)
  
echo "Creating /login resource"
LOGIN_RESOURCE_ID=$(aws apigateway create-resource \
  --rest-api-id ${REST_API_ID} \
  --parent-id ${ROOT_RESOURCE_ID} \
  --path-part login \
  --query 'id' \
  --output text)

echo "Creating /login method"
LOGIN_METHOD=$(aws apigateway put-method \
  --rest-api-id ${REST_API_ID} \
  --resource-id ${LOGIN_RESOURCE_ID} \
  --http-method POST \
  --authorization-type "NONE")

echo "Adding /login integration"
LOGIN_INTEGRATION=$(aws apigateway put-integration \
  --rest-api-id ${REST_API_ID} \
  --resource-id ${LOGIN_RESOURCE_ID} \
  --http-method POST \
  --type AWS_PROXY \
  --integration-http-method POST \
  --uri arn:aws:apigateway:${AWS_REGION}:lambda:path/2015-03-31/functions/${FUNCTION_ARN}/invocations)
  

echo "Creating /users resource"
USERS_RESOURCE_ID=$(aws apigateway create-resource \
  --rest-api-id ${REST_API_ID} \
  --parent-id ${ROOT_RESOURCE_ID} \
  --path-part users \
  --query 'id' \
  --output text)

echo "Creating /users method"
USERS_METHOD=$(aws apigateway put-method \
  --rest-api-id ${REST_API_ID} \
  --resource-id ${USERS_RESOURCE_ID} \
  --http-method POST \
  --authorization-type "NONE")

echo "Adding /users integration"
USERS_INTEGRATION=$(aws apigateway put-integration \
  --rest-api-id ${REST_API_ID} \
  --resource-id ${USERS_RESOURCE_ID} \
  --http-method POST \
  --type AWS_PROXY \
  --integration-http-method POST \
  --uri arn:aws:apigateway:${AWS_REGION}:lambda:path/2015-03-31/functions/${FUNCTION_ARN}/invocations)

echo "Creating /games resource"
GAMES_RESOURCE_ID=$(aws apigateway create-resource \
  --rest-api-id ${REST_API_ID} \
  --parent-id ${ROOT_RESOURCE_ID} \
  --path-part games \
  --query 'id' \
  --output text)

echo "Creating /games method"
GAMES_METHOD=$(aws apigateway put-method \
  --rest-api-id ${REST_API_ID} \
  --resource-id ${GAMES_RESOURCE_ID} \
  --http-method POST \
  --authorization-type "NONE")
  
echo "Creating /games method"
GAMES_METHOD=$(aws apigateway put-method \
  --rest-api-id ${REST_API_ID} \
  --resource-id ${GAMES_RESOURCE_ID} \
  --http-method GET \
  --authorization-type "NONE")

echo "Adding /games integration"
GAMES_INTEGRATION=$(aws apigateway put-integration \
  --rest-api-id ${REST_API_ID} \
  --resource-id ${GAMES_RESOURCE_ID} \
  --http-method POST \
  --type AWS_PROXY \
  --integration-http-method POST \
  --uri arn:aws:apigateway:${AWS_REGION}:lambda:path/2015-03-31/functions/${FUNCTION_ARN}/invocations)
  
echo "Adding /games integration"
GAMES_INTEGRATION=$(aws apigateway put-integration \
  --rest-api-id ${REST_API_ID} \
  --resource-id ${GAMES_RESOURCE_ID} \
  --http-method GET \
  --type AWS_PROXY \
  --integration-http-method GET \
  --uri arn:aws:apigateway:${AWS_REGION}:lambda:path/2015-03-31/functions/${FUNCTION_ARN}/invocations)
  
echo "Creating /games/{gameId} resource"
  GAMEID_RESOURCE_ID=$(aws apigateway create-resource \
  --rest-api-id ${REST_API_ID} \
  --parent-id ${GAMES_RESOURCE_ID} \
  --path-part '{gameId}' \
  --query 'id' \
  --output text)

echo "Creating /games/{gameId} method"
  GAMEID_METHOD=$(aws apigateway put-method \
  --rest-api-id ${REST_API_ID} \
  --resource-id ${GAMEID_RESOURCE_ID} \
  --http-method GET \
  --authorization-type "NONE")
  
  echo "Creating /games/{gameId} method"
  GAMEID_POST_METHOD=$(aws apigateway put-method \
  --rest-api-id ${REST_API_ID} \
  --resource-id ${GAMEID_RESOURCE_ID} \
  --http-method POST \
  --authorization-type "NONE")


echo "Adding /games/{gameId} integration"
 GAMEID_INTEGRATION=$(aws apigateway put-integration \
  --rest-api-id ${REST_API_ID} \
  --resource-id ${GAMEID_RESOURCE_ID} \
  --http-method GET \
  --type AWS_PROXY \
  --integration-http-method GET \
  --uri arn:aws:apigateway:${AWS_REGION}:lambda:path/2015-03-31/functions/${FUNCTION_ARN}/invocations)

echo "Adding /games/{gameId} integration"
 GAMEID_POST_INTEGRATION=$(aws apigateway put-integration \
  --rest-api-id ${REST_API_ID} \
  --resource-id ${GAMEID_RESOURCE_ID} \
  --http-method POST \
  --type AWS_PROXY \
  --integration-http-method POST \
  --uri arn:aws:apigateway:${AWS_REGION}:lambda:path/2015-03-31/functions/${FUNCTION_ARN}/invocations)



echo "Adding /games/{gameId} lambda permission"
 GAMEID_PERMISSION=$(aws lambda add-permission \
  --function-name tictactoe-api \
  --statement-id gameIDGETpermissionabcz \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:${AWS_REGION}:${ACCOUNT_ID}:${REST_API_ID}/prod/GET/games/{gameId}")
  
echo "Adding /games/{gameId} lambda permission"
 GAMEID_PERMISSION=$(aws lambda add-permission \
  --function-name tictactoe-api \
  --statement-id gameIDPOSTpermissionabcz \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:${AWS_REGION}:${ACCOUNT_ID}:${REST_API_ID}/prod/POST/games/{gameId}")
 

echo "Adding /games GET lambda permission"
GAMES_PERMISSION=$(aws lambda add-permission \
  --function-name tictactoe-api \
  --statement-id gameGETpermissionabcz \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:${AWS_REGION}:${ACCOUNT_ID}:${REST_API_ID}/prod/GET/games")
  
echo "Adding /games POST lambda permission"
GAMES_PERMISSION=$(aws lambda add-permission \
  --function-name tictactoe-api \
  --statement-id gamePOSTpermissionabcz  \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:${AWS_REGION}:${ACCOUNT_ID}:${REST_API_ID}/prod/POST/games")

echo "Adding /users lambda permission"
USERS_PERMISSION=$(aws lambda add-permission \
  --function-name tictactoe-api \
  --statement-id userPOSTpermissionabcz \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:${AWS_REGION}:${ACCOUNT_ID}:${REST_API_ID}/prod/POST/users")

echo "Adding lambda permission"
PERMISSION=$(aws lambda add-permission \
  --function-name tictactoe-api \
  --statement-id permissionabcz \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:${AWS_REGION}:${ACCOUNT_ID}:${REST_API_ID}/*/*")

echo "Creating /games deployment"
GAMES_DEPLOYMENT=$(aws apigateway create-deployment \
  --rest-api-id ${REST_API_ID} \
  --stage-name prod)


echo "REST API created"
echo ""
echo "Your API is available at: https://${REST_API_ID}.execute-api.${AWS_REGION}.amazonaws.com/prod"
echo "export BASE_URL=https://${REST_API_ID}.execute-api.${AWS_REGION}.amazonaws.com/prod" >> env.sh
