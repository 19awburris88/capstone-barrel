const { Pool } = require('pg');
require('dotenv').config();

// ✅ Use DATABASE_URL if available, otherwise fall back to a local setup
const client = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/barrelexchange',
  // You could also use this format if needed:
  // user: 'your_user',
  // host: 'localhost',
  // database: 'barrelexchange',
  // password: 'your_password',
  // port: 5432,
});

client.connect()
  .then(() => {
    console.log('✅ Connected to Postgres DB');
    return client.query('SELECT current_database()');
  })
  .then(res => {
    console.log(`📦 Connected to database: ${res.rows[0].current_database}`);
  })
  .catch(err => console.error('❌ DB connection error:', err));

module.exports = client;
