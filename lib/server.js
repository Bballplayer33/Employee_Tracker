
const express = require('express');
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');

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