//Requires

const inquirer = require("inquirer");

const mysql = require("mysql");

const keys = require("./keys")
// table or table-cli npm package to style the console log product table
//Globals
// colors (you can add color to the console.log message) npm

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: keys.mySql.password,
    database: "bamazon"
});

connection.connect(function (error) {
    if (error) throw error;
    conTest()

    // if (error){
    //     console.log(error)
    // }
    // else{
    //     conTest()
    // }

})


function conTest() {

    //let connection = await mysql.createConnection(connectionParams);
    connection.query(
        `SELECT * FROM products`, function (error, rows) {
            // console.log(`\n`, rows);
            for (var i = 0; i < rows.length; i++) {
                console.log(rows[i].id, rows[i].product_name, rows[i].price)
            }

            askcustomer()
        }
    );


}


function askcustomer() {
    // Create a "Prompt" with a series of questions.
    inquirer
        .prompt([
            // Here we create a basic text prompt.
            {
                type: "number",
                message: "What is the ID of the product you would like to purchase?",
                name: "id"
            },
            // 
            {
                type: "number",
                message: "How many units of the product would you like to purchase?",
                name: "units"
            }
        ]).then(function (res) {
            console.log(res)
            //console.log(res.id, res.units)


            // go to the db and look if you have enough stock
            connection.query(
                `SELECT * FROM products WHERE id=${res.id}`, function (error, prod) {
                    if (error) {
                        console.log(error)
                    }
                    else {
                        console.log(prod[0])
                        console.log(prod[0].stock_quantity)

                        //compare the db quantity with the units
                        if (res.units <= prod[0].stock_quantity) {
                            var new_stock = prod[0].stock_quantity - res.units
                            connection.query(
                                "UPDATE products SET ? WHERE ?",
                                [
                                  {
                                    stock_quantity: new_stock
                                  },
                                  {
                                    id: res.id
                                  }
                                ],
                                function(error) {
                                  if (error) throw err;
                                  console.log("package on the way!");
                                  askcustomer();
                                }
                              );
                            // lets do it (sell the prodcut)
                            //update the db with the new stock 
                            // askcustomer if the want other product
                        }
                        else{
                            console.log("not enough")
                            askcustomer()
                            // tell the user not enough stock
                            // ask the customer if they want other product
                        }
                    }
                }
            );
            // if you have enough then sell this  means: you update the db with the new stock and the tell the user congrat you will get your purchase
            // then go offer more products

            // ii not enough stock then tell user and ask for other unit or whatever 

        })

}