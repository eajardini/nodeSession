// create database escolaerp;

// CREATE TABLE users (
//   ID SERIAL PRIMARY KEY,
//   name VARCHAR(30),
//   email VARCHAR(30)
// );

// INSERT INTO users (name, email)
//   VALUES ('Jerry', 'jerry@example.com'), ('George', 'george@example.com');


const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '172.17.0.1',
  database: 'escolaerp',
  password: 'postdba',
  port: 5432,
})

module.exports = {
    query: (text, params) => pool.query(text, params),
  };