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
                "Add employee",
                "View employees",
                "Update employee role"
            ]
        }
    ]).then((res) => {
        switch (res.choice) {
        case "Add employee":
            add();
            break;
        
        case "View employees":
            view();
            break;
        
        case "Update employee role":
            update();
            break;
        default:
            console.log("error near switch");
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
        (res.role === 'Sales Lead') ? roleID = 1:
        (res.role === 'Salesperson') ? roleID = 2:
        (res.role === 'Lead Engineer') ? roleID = 3:
        (res.role === 'Software Engineer') ? roleID = 4:
        (res.role === 'Account Manager') ? roleID = 5:
        (res.role === 'Accountant') ? roleID = 6:
        (res.role === 'Legal Team Lead') ? roleID = 7: 
        roleID = 8;

        let manager = 1;
        (roleID === 2) ? manager = 1 :
        (roleID === 4) ? manager = 3 :
        (roleID === 6) ? manager = 5 :
        (roleID === 8) ? manager = 7 : 1;

        
        
        var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('" + res.first_name + "', '" + res.last_name + "', " + roleID + ", " + manager + ")";
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
    var query = "SELECT employee.id, first_name, last_name, title, department_name, salary, manager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department on role.departmentID = department.id";
    connection.query(query, 
        (err, res) => {
            if (err) throw err;
            console.table(res);
            start();
        }
    );
    
}

function update() {
    var query = "SELECT first_name, last_name, title, department_name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department on role.departmentID = department.id";
    connection.query(query, 
        (err, res) => {
            let names = res.map(e => e.first_name + " " + e.last_name);
            if (err) throw err;
            return inquirer.prompt([
                {
                    type: "list",
                    name: "employee",
                    message: "Which employee would you like to update?",
                    choices: names
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
                (res.role === 'Sales Lead') ? roleID = 1:
                (res.role === 'Salesperson') ? roleID = 2:
                (res.role === 'Lead Engineer') ? roleID = 3:
                (res.role === 'Software Engineer') ? roleID = 4:
                (res.role === 'Account Manager') ? roleID = 5:
                (res.role === 'Accountant') ? roleID = 6:
                (res.role === 'Legal Team Lead') ? roleID = 7: 
                roleID = 8;
                
                let strArr = res.employee.split(" ");
                
                var query = "UPDATE employee SET role_id = '" + roleID + "' WHERE '" + strArr[0] + "' = first_name";
                connection.query(query, 
                    (err, res) => {
                        if (err) throw err;
                        console.log(res);
                        start();
                    }
                );
            });
        }
    );
}
