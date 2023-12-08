Group Members:
Magdalen Alexander (Author)
Igor Ruden
API Gateway Link: https://y5ngnbx1ye.execute-api.us-west-2.amazonaws.com/prod

The most challenging part of this assignment was learning a new language and web dev techniques that I hadn't encountered before. I didn't entirely succeed, but I 
used online resources to handle this challenge. 
While all the AWS resources, created from my scripts, are individually functional, I struggled to completely implement a cli that handled all of the interactions
necessary for the game to function. My interface can create games and register and login users, but does not functionally perform the game moves or notify 
users via email. It also doesn't contain the user prompts that would make it more than a skeleton. When registering a phone number, I input a default one for all users because I didn't fully finish switching functionality from emails to phone numbers, but all user searching is done via email. 


Functional CLI Commands: 

Create user: node cli.js create-user --username [username] --password [password] --email [email]

Login: node cli.js login --username [password] --password [password]

Create game: node cli.js create-game --opponent [opponent's email]

Bugged CLI Commands: 

Fetch game: node cli.js fetch-game --gameId [gameid]

Make move: node cli.js move --gameId [gameId] --user [username] --row [row] --col [column] --entry [X or O]

LINK TO SCREEN RECORDING: https://www.loom.com/share/5907a8ab186046c7bc3c37d756f3a509?sid=fd966442-9295-4ced-8fbd-f6d818e34221
