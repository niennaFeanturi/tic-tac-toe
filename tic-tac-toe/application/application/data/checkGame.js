const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});

//entry is set before move is updated,
//so use opposite entry after move is posted to check for win
const isWon = async (game) => {
  let win = false;
  let entry = parseInt(game.move)%2 === 0 ? "O" : "X";
  let b = await game.board;
  let r1 = await b[0];
  let r2 = await b[1];
  let r3 = await b[2];
  let c1 = await [b[0][0],b[1][0],b[2][0]];
  let c2 = await [b[0][1],b[1][1],b[2][1]];
  let c3 = await [b[0][2],b[1][2],b[2][2]];
  let d1 = await [b[0][0],b[1][1],b[2][2]];
  let d2 = await [b[0][2],b[1][1],b[2][0]];
  let lines = await [r1,r2,r3,c1,c2,c3,d1,d2];
  for (let i = 0; i < 8; i++) {
    let l = await lines[i];
    if (l[0]==entry && l[1]==entry && l[2]==entry) win = true;
  }
  return win;
}
const checkGame = async ({game}) => {
  const params = {
    TableName: 'tictactoe-db',
    Key: {
      gameId: game.gameId
    },
    UpdateExpression: `SET winner = :user`,
    ConditionExpression: `winner = :empty AND move <= :moveLimit`,
    ExpressionAttributeValues: {
      ":user": game.lastMoveBy,
      ":empty" : " ",
      ":moveLimit" : 9
    },
    ReturnValues: 'ALL_NEW'
  };
  
  try {
    if (await isWon(game)) {
      const resp = await documentClient.update(params).promise()
      return resp.Attributes;
    }
    else {
      return game;
    }
  } catch (error) {
    console.log('Error updating item: ', error.message);
    throw new Error('Could not check winner');
  }
};

module.exports = checkGame;
