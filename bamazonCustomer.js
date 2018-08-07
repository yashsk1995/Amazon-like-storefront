// npm package inquirer
var inquirer = require('inquirer');
// require a file functions that contain logic of all funtcionalities
var functions = require('./functions.js');

// run function that start application
var run = function () {

  // inquirer that take input from user
  inquirer.prompt({
    name: "input",
    type: "rawlist",
    // message to display user
    message: "Please select one of this choices ....",
    // user choices
    choices: ["Buy", "To see list"]
  })
    .then(function (answer) {
      // switch case for proper input compare to user input
      switch (answer.input) {
        case "Buy":
          // calling function from fnuctions js name searchbyid
          functions.Searchbyid();
          break;


        case "To see list":
          // calling function from fnuctions js name display
          functions.display();
          break;
      }
    });

}

// start app
run();

