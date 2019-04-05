const fs = require("fs");

//write out data
 function done(output) {
     process.stdout.write(output);
     process.stdout.write('\nprompt > ');
 }

//where we will store our commands
 function evaluateCmd(userInput) {
  //parses the user input to understand which command was typed
   const userInputArray = userInput.split(" ");
   const command = userInputArray[0];

   switch (command) {
      case "echo":
      //we will add the functionality of echo next within the object commandLibrary    
      commandLibrary.echo(userInputArray.slice(1).join(" "));
      break;

      case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;

      case "head":
      commandLibrary.head(userInputArray.slice(1));
      break;

      case "tail":
      commandLibrary.tail(userInputArray.slice(1));
      break;

      default: 
      commandLibrary.badInput(userInputArray.slice(0, 1));
      break;

    }
 }

//where we will store the logic of our commands
 const commandLibrary = {
   //the echo command
   "echo": function(userInput) {
      done(userInput);
   },

   //the cat command
   "cat": function(fullPath) {
      const fileName = fullPath[0];
      
      fs.readFile(fileName, (err, data) => {
         if (err) throw err;
         done(data);
      });
   },

   //the head command
   "head": function(fullPath) {
      const fileName = fullPath[0];
      const linePreview = 5;
      
      fs.readFile(fileName, 'utf8', (err, data) => {
         if (err) throw err;
         var slicedText = data.split('\n').slice(0,linePreview).join('\n');
         done(slicedText);
      })
   },

   //the tail command
   "tail": function(fullPath) {
      const fileName = fullPath[0];
      const linePreview = -5;
      
      fs.readFile(fileName, 'utf8', (err, data) => {
         if (err) throw err;
         var slicedText = data.split('\n').slice(linePreview).join('\n');
         done(slicedText);
      })
   },

   //default errorHandler
   "badInput": function(userInputCommand) {
      done(`"${userInputCommand}" is not a command.`);
   }

 };

 module.exports.commandLibrary = commandLibrary;
 module.exports.evaluateCmd = evaluateCmd;