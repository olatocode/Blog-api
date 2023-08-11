/** @format */

const Pool = require('pg').Pool;
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DBCONLINK,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.query('SELECT NOW()', (err, res) => {
  if (!err) {
    console.log('Connected to PostgresDB');
  } else {
    console.log(err.message);
  }
});

module.exports = pool;
