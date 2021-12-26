const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'q2e4t6u8',
  host: 'localhost',
  port: 5432,
  database: 'todos',
});

module.exports = pool;
