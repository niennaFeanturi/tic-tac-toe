source env.sh

echo "Building zip file"
zip -rq application.zip application/

echo "Updating Lambda function"
FUNCTION_ARN=$(aws lambda update-function-code \
  --function-name tictactoe-api \
  --zip-file fileb://application.zip)

echo "Lambda function updated"