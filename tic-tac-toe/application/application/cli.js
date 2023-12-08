const yargs = require('yargs');
const config = require('./config');
const { exec } = require('child_process');
const fs = require('fs');
const configFile = './config.js';
const sendMessage = './sendMessage.js';
let configContent = fs.readFileSync(configFile, 'utf-8');
let loggedInIdToken;

//login


yargs.command({
  command: 'create-user',
  describe: 'Create a new user',
  builder: {
    username: {
      describe: 'Username for login',
      demandOption: true,
      type: 'string',
    },
    password: {
      describe: 'Password for login',
      demandOption: true,
      type: 'string',
    },
    email: {
      describe: 'User\'s email',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    // Construct the curl command using the provided options
    const curlCommand = `curl -X POST ${config.BASE_URL}/users \
      -H 'Content-Type: application/json' \
      -d '{
        "username": "${argv.username}",
        "password": "${argv.password}",
        "email": "${argv.email}",
        "phoneNumber": "+1234567890"
      }'`;

    console.log('Executing curl command:', curlCommand);

    // Execute the curl command
    exec(curlCommand, (err, stdout, stderr) => {
      if (err) {
        console.error('Error executing curl command:', stderr);
        console.log('User creation failed. Please check your inputs.');
        return;
      }
      console.log(stdout);
      console.log('User created successfully.');
    });
  },
});


yargs.command({
    command: 'login',
    describe: "Login to the application",
    builder: {
    username: {
      describe: 'Username for login',
      demandOption: true,
      type: 'string',
    },
    password: {
      describe: 'Password for login',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    // Construct the curl command using the provided options
    const curlCommand = `curl -X POST ${config.BASE_URL}/login \
      -H 'Content-Type: application/json' \
      -d '{
        "username": "${argv.username}",
        "password": "${argv.password}"
      }'`;

    // Execute the curl command
    exec(curlCommand, (err, stdout, stderr) => {
      if (err) {
        console.error('Error executing curl command:', stderr);
        return;
      }
      // Parse the JSON response to get the ID token
      const response = JSON.parse(stdout);
      console.log(response);
      loggedInIdToken = response.idToken
      process.env.LOGGED_IN_ID_TOKEN = loggedInIdToken;
      const newLoggedInIdToken = loggedInIdToken;
      configContent = configContent.replace(/ID_TOKEN: '.*'/, `ID_TOKEN: '${newLoggedInIdToken}'`);
      fs.writeFileSync('./config.js', configContent, 'utf-8');
      console.log('Login successful. ID Token:', process.env.LOGGED_IN_ID_TOKEN);
    });
  },
});


yargs.command({
  command: 'create-game',
  describe: 'Create a new game',
  builder: {
    opponent: {
      describe: 'email of the opponent',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    const curlCommand = `curl -X POST ${config.BASE_URL}/games \
      -H 'Content-Type: application/json' \
      -H "Authorization: ${config.ID_TOKEN}" \
      -d '{
        "opponent": "${argv.opponent}"
      }'`;

    console.log(process.env.LOGGED_IN_ID_TOKEN);

    console.log('Executing curl command:', curlCommand);

    exec(curlCommand, (err, stdout, stderr) => {
      if (err) {
        console.error('Error executing curl command:', stderr);
        console.log('Game creation failed. Please check your inputs.');
        return;
      }
      
      // Parse the JSON response to get the gameId
      const response = JSON.parse(stdout);
      const gameId = response.gameId;
      console.log('Game created successfully. Game ID:', response);
    
    });
  },
});

yargs.command({
  command: 'fetch-game',
  describe: 'get info about an existing game',
  builder: {
    gameId: {
      describe: 'id of the game',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    const curlCommand = `curl -X GET ${config.BASE_URL}/vtyahrvrlg/*/GET/games/${argv.gameId}`;

    console.log('Executing curl command:', curlCommand);

    exec(curlCommand, (err, stdout, stderr) => {
      if (err) {
        console.error('Error executing curl command:', stderr);
        console.log('Could not find game. Please check your inputs.');
        return;
      }

      try {
        // Attempt to parse as JSON
        const response = JSON.parse(stdout);
        console.log(response);
      } catch (jsonError) {
        // If parsing fails, print raw response
        console.log('Raw response:', stdout);
      }
    });
  },
});

yargs.command({
  command: 'move',
  describe: 'make a move in the game',
  builder: {
    gameId: {
      describe: 'users id token',
      demandOption: true,
      type: 'string',
    },
    user: {
      describe: 'username',
      demandOption: true,
      type: 'string',
    },
    row: {
      describe: 'row',
      demandOption: true,
      type: 'string',
    },
    col: {
      describe: 'column',
      demandOption: true,
      type: 'string',
    },
    entry: {
      describe: 'must be X or O',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    const curlCommand = `curl -X POST ${config.BASE_URL}/games/${argv.gameId} \
  -H 'Content-Type: application/json' \
  -d '{
  "gameId": "${argv.gameId}",
  "user": "${argv.user}",
  "row": "${argv.row}",
  "col": "${argv.col}",
  "entry": "${argv.entry}"
}'`;

    console.log('Executing curl command:', curlCommand);
    exec(curlCommand, (err, stdout, stderr) => {
      if (err) {
        console.error('Error executing curl command:', stderr);
        console.log('Could not find game. Please check your inputs.');
        return;
      }

      try {
        // Attempt to parse as JSON
        const response = JSON.parse(stdout);
        console.log(response);
      } catch (jsonError) {
        // If parsing fails, print raw response
        console.log('Raw response:', stdout);
      }
    });
  }
});

yargs.parse();
    
    
    