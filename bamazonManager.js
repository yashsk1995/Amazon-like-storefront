// View Products for Sale
// View Low Inventory
// Add to Inventory
// Add New Product

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
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    })
        .then(function (answer) {
            // switch case for proper input compare to user input
            switch (answer.input) {
                case "View Products for Sale":
                    // calling function from fnuctions js name listofproductssale
                    functions.listofproductssale();
                    break;
                case "View Low Inventory":
                    // calling function from fnuctions js name lowinventory
                    functions.lowInventory();
                    break;

                case "Add to Inventory":
                    // calling function from fnuctions js name addtoinventory
                    functions.addtoInventory();
                    break;

                case "Add New Product":
                    // calling function from fnuctions js name addproduct
                    functions.addProduct();
                    break;


            }
        });


}

// start app
run();

