//npm package inquirer
var inquirer = require('inquirer');
// npm package mysql
var mysql = require("mysql");

var Table = require('cli-table');


// creating connection
var connection = mysql.createConnection({
    // host
    host: "localhost",
  
    // port 3306
    port: 3306,
  
    //  username
    user: "root",
  
    //  password
    password: "root",
   
    // database name
    database: "bamazon"
  });
//   connection to connection
  connection.connect(function(err) {
    //   if err
    if (err) throw err;
    
  });

var Searchbyid = function(){
    // console.log("Searchbyid");
// inquirer take input of id and quantity
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: 'Please enter ID of the product you would like to buy !!'
            
          },

        {
          type: "input",
          name: "unit",
          message: 'How many units of the product you would like to buy?'
        },
      
      
      ]).then(function(answer) {
        update();

// funtcion update that update in database 
        function update(){
            // storing id 
            var userid =answer.id;
            // storing unit 
           var userunit = answer.unit; 
            // query to select a row by using id that enter by user
           connection.query("SELECT * FROM products where item_id =" +userid , function(err, res) {
            if (err) throw err;
            
          var quant;
          var price;
          for (i=0;i < res.length ;i++)
          { 
            //   display data which selected by user 
              console.log(" ID : "+res[i].item_id +"    |  Product Name : "+res[i].product_name+"    |  Department Name : "+res[i].department_name+"    |  Price : "+res[i].price+"   |  Quantity : "+ res[i].stock_quantity +" ");
            
           
              //  storing quantity from database
              quant = res[i].stock_quantity;
            //   storing price from database
             price = res[i].price;
            }
            // checking if user enters more quantity then in database have
          if(userunit > quant)
            {
                // displaying msg to user 
                console.log("Insufficient quantity!");
            }
          else{
            //   storing newquantity after user want to buy perticular
               var newquantity = quant - userunit;
            //  counting price of unit that user want to buy
               var newprice = userunit * price;

                // query that update value in database after user input to buy
               var query = connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                    stock_quantity: newquantity
                  },
                  {
                    item_id: userid
                  }
                ],
                function(err, res) {
                    // displays how many rows updated in datbase 
                  console.log(res.affectedRows + " products updated! quantity sets at "+newquantity+"\n");
                  console.log("Your Total Amount is : "+ newprice);
                  
                }
              );
            
          }
        //   connection ends 
                            connection.end();
            });
        }
           
        
      });
    
}


var display = function(){
    readProducts();
    //   readproducts from database
    function readProducts() {

        console.log("All products list...\n");
        // query to select all data from table products
        connection.query("SELECT * FROM products", function(err, res) {
          if (err) throw err;
        //   creating table 
          var table = new Table({
            head: ['Item Id', 'Product Name','Department Name','Price','Stock Quantity'],
             colWidths: [20, 20,20,20,20]
        });
     
        // loop on all data from table
        for (i=0;i < res.length ;i++)
        {
            // display details 
            // console.log(" ID : "+res[i].item_id +"    |  Product Name : "+res[i].product_name+"    |  Department Name : "+res[i].department_name+"    |  Price : "+res[i].price+"   |  Quantity : "+ res[i].stock_quantity +" ");
          
             
            // table is an Array, so `push`
            table.push(
                [res[i].item_id, res[i].product_name,res[i].department_name,res[i].price,res[i].stock_quantity ]
              
            );
             
        }     
// connection ends          
   console.log(table.toString());

          connection.end();
        });
      }
    }

// exports this funtion to bamazonCustomer js
module.exports = {
    Searchbyid : Searchbyid,
    display:display
}