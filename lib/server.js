
const express = require('express');
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const util = require('util');
const { async } = require('jshint/src/prod-params');


const PORT = process.env.PORT || 3001;
const app = express();

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'Elmountg1!',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

  const questions = {
    type: "list",
    message: "What would you like to do?",
    name: "continue",
    choices: [
      "View All Employees",
      "View All Departments",
      "View All Roles",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Change an Employee Role",
      "Quit",
    ],
  };




  function start() {
    inquirer.prompt([questions]).then((response) => {
      switch(response.continue) {
        case 'View All Employees':
          viewAllEmployees()
          break;

        case 'View All Departments':
            viewAllDepartment()
            break;
        
        case 'View All Roles':
              viewAllRole()
              break;

        case 'Add a Department':
                createDepartment()
                break;

        case 'Add a Role':
                createRole()
                break;

        case 'Add an Employee':
                  createEmployee()
                  break;
                  
        case 'Change an Employee Role':
                    updateEmployee()
                    break;
        
        
        case 'Quit':
          process.exit()
          break;
      }
      // add a role, add an employee, and update an employee role
})}



async function viewAllEmployees() {
  const [rows] = await db.promise().query('SELECT * FROM employee');
  console.log("\n");
  console.table(rows);
  console.log("\n");
  
  start();
  }

  async function viewAllDepartment() {
    const [rows, fields] = await db.promise().query('SELECT * FROM department');
    console.log("\n");
    console.table(rows);
    console.log("\n");
    
    start();
    }

    async function viewAllRole() {
      const [rows, fields] = await db.promise().query('SELECT * FROM role');
      console.log("\n");
      console.table(rows);
      console.log("\n");
      
      start();
      }

    async function createDepartment() {
      const { departmentName } = await inquirer.prompt (
        {
          type: 'input',
          message: 'Name of new Department?',
          name: 'departmentName'
        }
      )
      await db.promise().query('INSERT INTO department SET ?', {name: departmentName})
      
      start()
    }

    async function createRole() {
      const data = await db.promise().query('SELECT * FROM department')
      //console.log(data);
      let departmentList = await data[0].map(item => {
        return {name: item.name, value: item.id}
      });

      const { roleTitle, roleSalary, departmentId } = await inquirer.prompt ([
        {
          type: 'input',
          message: 'Role Title?',
          name: 'roleTitle'
        },
      {
        type: 'input',
        message: 'What is the salary of this Role?',
        name: 'roleSalary'
      },
      {
        type: 'list',
        message: 'Choose a department',
        choices: departmentList,
        name: 'departmentId'
      }
    ])

    await db.promise().query('INSERT INTO role SET ?', {title: roleTitle, salary: roleSalary, department_id: departmentId })
      
      start()
    }

    async function createEmployee() {
      const roleData = await db.promise().query('SELECT * FROM role')
      let roleList = await roleData[0].map(item => {
        return {name: item.title, value: item.id}
      });
      const managerData = await db.promise().query('SELECT * FROM employee')
      let onlyManagers = managerData[0].filter(item => item.manager_id === null)

      console.log(onlyManagers)
      let managerList = await onlyManagers.map(item => {
        return {name: item.first_name + ' ' + item.last_name, value: item.id}
      })
      
      const { firstName, lastName, roleId, managerId } = await inquirer.prompt ([
        {
          type: 'input',
          message: 'First Name?',
          name: 'firstName'
        },
      {
        type: 'input',
        message: 'Last Name?',
        name: 'lastName'
      },
      {
        type: 'list',
        message: 'Whats the employees role?',
        choices: roleList,
        name: 'roleId'
      },
      {
        type: 'list',
        message: 'Managers name?',
        choices: managerList,
        name: 'managerId'
      }
    ])

      await db.promise().query('INSERT INTO employee SET ?', 
      {first_name: firstName, last_name: lastName, role_id: roleId, manager_id: managerId })
      
      start()
    }

    async function updateEmployee() {
      const data = await db.promise().query('SELECT * FROM employee');
      let onlyEmployee = data[0];
        let employeeList = await onlyEmployee.map(item => {
          return {name: item.first_name + ' ' + item.last_name, value: item.id}
        });
        const pickedData = await db.promise().query('SELECT * FROM role');
        let onlyRole = pickedData[0];
        let pickedList = await onlyRole.map(item => {
          return {name: item.title, value: item.id}
        });
      
      const {pickedEmployee, newId} = await inquirer.prompt (
        [
          {
            type: 'list',
            message: 'Choose Employee',
            choices: employeeList,
            name: 'pickedEmployee'
          },
          {
            type: 'list',
            message: 'Choose a new role ',
            choices: pickedList,
            name: 'newId'
          }
        ]
      )

      await db.promise().query('UPDATE employee SET ' + '_id = ?' + newId + 'WHERE id = ?' + pickedEmployee)

       start();
    }

  
  start();