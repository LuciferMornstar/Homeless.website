import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'db5017676906.hosting-data.io',
  user: 'dbu5385048',
  password: 'Z9EYceyh28Up9kH',
  database: 'dbs14137291',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;