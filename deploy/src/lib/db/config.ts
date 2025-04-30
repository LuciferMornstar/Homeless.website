export const dbConfig = {
  host: 'db5017676906.hosting-data.io',
  database: 'dbs14137291',
  user: 'dbu5385048',
  password: 'Z9EYceyh28Up9kH',
  ssl: {
    rejectUnauthorized: false
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 30000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000
} as const;