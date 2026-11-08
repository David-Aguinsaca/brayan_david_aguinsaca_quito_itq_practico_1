
// 2. Crea el archivo db.js junto a index.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'postgres_local_password',   // la que pusiste al instalar
  host: 'localhost',
  port: 5432,
  database: 'tienda'
});

module.exports = pool;    // para usarlo desde index.js