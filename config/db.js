/** @format */

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'BlogDB',
  password: '123456',
  port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
  if (!err) {
    console.log('Connected to PostgresDB');
  } else {
    console.log(err.message);
  }
});

module.exports = pool;