// src/controllers/productos.controller.js · recibe, valida y responde
const Producto = require('../model/producto.model');

const datosValidos = d => d.nombre && Number(d.precio) > 0;
const idValido = id => Number.isInteger(id) && id > 0;

async function listar(req, res) {
  res.status(200).json(await Producto.listar());
}

async function obtener(req, res) {
  const id = Number(req.params.id);
  if (!idValido(id)) return res.status(400).json({ mensaje: 'Id inválido' });

  const producto = await Producto.buscarPorId(id);
  if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
  res.status(200).json(producto);
}

async function crear(req, res) {
  const datos = req.body || {};
  if (!datosValidos(datos)) return res.status(400).json({ mensaje: 'Datos inválidos' });

  res.status(201).json(await Producto.crear(datos));
}

async function actualizar(req, res) {
  const id = Number(req.params.id);
  const datos = req.body || {};
  if (!idValido(id)) return res.status(400).json({ mensaje: 'Id inválido' });
  if (!datosValidos(datos)) return res.status(400).json({ mensaje: 'Datos inválidos' });

  const producto = await Producto.actualizar(id, datos);
  if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
  res.status(200).json(producto);
}

async function eliminar(req, res) {
  const id = Number(req.params.id);
  if (!idValido(id)) return res.status(400).json({ mensaje: 'Id inválido' });

  const borrado = await Producto.eliminar(id);
  if (!borrado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
  res.status(204).send();
}

module.exports = { listar, obtener, crear, actualizar, eliminar };