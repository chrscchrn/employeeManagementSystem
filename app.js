const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Tiger.sql12",
    database: "employees"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});

function start() {
    return inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                "Add departments, roles, employees",
                "View departments, roles, employees",
                "Update employee roles"
            ]
        }
    ]).then((res) => {
        switch (res.choice) {
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
    return inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Enter their first name."
        },
        {
            type: "input",
            name: "last_name",
            message: "Enter their last name."
        },
        {
            type: "list",
            name: "role",
            message: "What would you like to do?",
            choices: [
                'Sales Lead', 
                'Salesperson', 
                'Lead Engineer', 
                'Software Engineer', 
                'Account Manager', 
                'Accountant', 
                'Legal Team Lead',
                'Lawyer'
            ]
        }
    ]).then((res) => {

        var roleID;
        (res.role === 'Sales Lead' || res.role === 'Salesperson') ? roleID = 1:
        (res.role === 'Lead Engineer' || res.role === 'Software Engineer') ? roleID = 2:
        (res.role === 'Account Manager' || res.role === 'Accountant') ? roleID = 3: roleID = 4;
        
        var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('" + res.first_name + "', '" + res.last_name + "', " + roleID + ", " + 1 + ")";
        console.log(query);
        connection.query(query, 
            (err, res) => {
                if (err) throw err;
                start();
            }
        );
    });
}

function view() {
    var query = "SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department on employee.manager_id = department.id";
    connection.query(query, 
        (err, res) => {
            if (err) throw err;
            console.table(res);
            start();
        }
    );
}

function update() {
    var query = "";
    connection.query(query, 
        (err, res) => {
            if (err) throw err;
            start();
        }
    );
}