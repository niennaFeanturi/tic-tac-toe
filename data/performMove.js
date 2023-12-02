const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

const performMove = async ({ gameId, user, row, col, entry, moveId }) => {
  const params = {
    TableName: "tictactoe-db",
    Key: {
      gameId: gameId,
      moveId: moveId + 1
    },
    UpdateExpression: `SET lastMoveBy = :user, game[${row}][${col}] = :entry`,
    ExpressionAttributeValues: {
      ":user": user,
      ":entry": entry
    },
    ReturnValues: "ALL_NEW" // This line should be inside the params object
  };

  try {
    const resp = await documentClient.update(params).promise();
    return resp.Attributes;
  } catch (error) {
    console.log("Error updating item: ", error.message);
    throw new Error('Could not perform move');
  }
};

module.exports = performMove;
