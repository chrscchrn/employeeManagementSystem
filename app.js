const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 1234,

    // Your username
    user: "root",

    // Your password
    password: "Tiger.sql12",
    database: "employees"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    var query = connection.query("SQL STUFF", 
        (err, res) => {
            if (err) throw err;
        }
    );
    console.log(query.sql);
    start();
}

function start() {
    return inquirer.prompt([
        {
            type: "name",
            name: "start",
            message: "What would you like to do?",
            choices: ["Add departments, roles, employees", "View departments, roles, employees", "Update employee roles"]
        }
    ]).then((res) => {
        switch (res.start) {
        case "Add departments, roles, employees":
            add();
            break;
        
        case "View departments, roles, employees":
            view();
            break;
        
        case "Update employee roles":
            update();
            break;
        }
    });
}

function add() {

}

function view() {

}

function update() {
    
}