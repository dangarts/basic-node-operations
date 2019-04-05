 const commands = require("./commands.js");

 process.stdout.write('prompt > ');//prompt the user for input
 process.stdin.on('data', (userInput) => {// The stdin 'data' event triggers after a user types in a line
   userInput = userInput.toString().trim();
   commands.evaluateCmd(userInput);//evaluateCmd is a function which will be implemented in commands.js
 });