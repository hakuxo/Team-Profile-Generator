// Grab Dependencies
const fs = require("fs");
const inquirer = require("inquirer");

const Manager = require("./lib/Manager");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

let employeeInfo = []

init = () => {
    employeeInfo = [];
    inquirer.prompt(managerQuestions)
    .then((data) => {
        const manager = new Manager(data.managerName, data.managerId, data.managerEmail, data.Number)
        employeeInfo.push(manager)
        console.log(employeeInfo)
        employeeList()
    })
}
// Questions for the manager 
const managerQuestions = [{
        type: "input",
        name: "managerName",
        message: "What should we call you?"
    },
    {
        type: "input",
        name: "managerId",
        message: "Please provide proof of your ID."
    },
    {
        type: "input",
        name: "managerEmail",
        message: "Please provide your email."
    },
    {
        type: "input",
        name: "Number",
        message: "Please provide cellular contact number."
    }
]
// Questions for engineer
function engineerQuestions() {
    inquirer.prompt([
    {
        type:"input",
        name: "engineerName",
        message: "What shall we call you?"
    },
    {
        type: "input",
        name: "engineerId",
        message: "Please provide proof of your employee ID."
    },
    {
        type: "input",
        name: "engineerEmail",
        message: "Please provide your email."
    },
    {
        type: "input",
        name: "github",
        message: "Enter your GitHub account to proceed."
    }
        ]).then((data) => {
            const engineer = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.github)
            employeeInfo.push(engineer)
            setTimeout(() => {
                employeeList()
            })
    }, 200)
}
// Questions for intern
function internQuestions() {
    inquirer.prompt([
        {
            type:"input",
            name: "internName",
            message: "What shall we call you?"
        },
        {
            type: "input",
            name: "internId",
            message: "Please provide proof of your employee ID."
        },
        {
            type: "input",
            name: "internEmail",
            message: "Please provide your email."
        },
        {
            type: "input",
            name: "school",
            message: "Please prove of education complex you partake in to proceed."
        }
        ]).then((data) => {
            const intern = new Intern(data.internName, data.internId, data.internEmail, data.school)
            employeeInfo.push(intern)
            setTimeout(() => {
                employeeList()
            })
    }, 200)
}

function employeeList() {
    inquirer.prompt({
        type: "list",
        name: "employeeRole",
        choices: ["Engineer", "Intern", "Finished"]
    }) .then((data) => {
        if (data.employeeRole === "Engineer") {
            engineerQuestions()
        } else if (data.employeeRole === "Intern") {
            internQuestions()
        } else {
            generateHTML()
            console.log("I guess your team has been created, good luck!")
        }
    })
}
function generateHTML() {
    let html = 
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./style.css">
        <title>Employee Team</title>
    </head>
    <body>
        <header>
            <h1>Your Employee Team</h1>
        </header>
    <body>`;
        for (const employee of employeeInfo) {
            html += 
            `<main>
            <div class="container">
                <div class="card">
                    <div class="employee">
                        <ol class="name">${employee.name}</ol>
                        <ol class="role">${employee.getRole()}</ol>
                    </div>
                    <div class="inside">
                        <div class="info">
                            <ol class="info1">ID: ${employee.id}</ol>
                            <ol class="info2">Email: ${employee.email}</ol>
                            <ol class="info3">${employee instanceof Manager ? 'Number: ' + employee.number : employee instanceof Engineer ? `GitHub: <a href='https://github.com/${employee.github}'>${employee.github}</a>` : 'School: ' + employee.school}</ol>
                        </div>
                    </div>
                </div>
            </div>
        </main>`
    html += `</main> </body> </html>`
    fs.writeFileSync("./src/employee-team.html", html);
}
    
init()
}