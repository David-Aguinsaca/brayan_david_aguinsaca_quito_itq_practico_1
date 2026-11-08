// src/models/producto.model.js · solo el SQL
const pool = require('../config/db');

async function listar() {
  const r = await pool.query('SELECT * FROM productos ORDER BY id');
  return r.rows;
}

async function buscarPorId(id) {
  const r = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
  return r.rows[0];                       // undefined si no existe
}

async function crear({ nombre, precio, stock }) {
  const r = await pool.query(
    `INSERT INTO productos (nombre, precio, stock)
     VALUES ($1, $2, $3) RETURNING *`,
    [nombre, precio, stock || 0]
  );
  return r.rows[0];
}

async function actualizar(id, { nombre, precio, stock }) {
  const r = await pool.query(
    `UPDATE productos SET nombre = $1, precio = $2, stock = $3
     WHERE id = $4 RETURNING *`,
    [nombre, precio, stock || 0, id]
  );
  return r.rows[0];                       // undefined si no existe
}

async function eliminar(id) {
  const r = await pool.query('DELETE FROM productos WHERE id = $1', [id]);
  return r.rowCount > 0;                  // true si borró algo
}

module.exports = { listar, buscarPorId, crear, actualizar, eliminar };