// index.js · solo enciende el servidor
require('dotenv').config();          // 1. PRIMERO: carga el .env

const app = require('./src/app');    // 2. Después: la aplicación

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor listo en el puerto ${PORT}`);
});