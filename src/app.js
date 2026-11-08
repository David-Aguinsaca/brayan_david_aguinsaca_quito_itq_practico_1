// src/app.js · arma la aplicación
const express = require('express');
const productosRoutes = require('./routes/productos.routes');

const app = express();
app.use(express.json());

app.use('/productos', productosRoutes);   // un módulo, una línea

// Si algo falla en la base, responde 500 sin mostrar el error SQL
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ mensaje: 'Error interno del servidor' });
});

module.exports = app;