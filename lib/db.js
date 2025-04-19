// lib/db.js
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Scalingo exige SSL, mais sans validation stricte
  }
});

export default pool;