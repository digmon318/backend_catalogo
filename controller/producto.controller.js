const productoService = require("../helpers/services/producto.service");

async function listar(req, res, next) {
  try {
    const resultado = await productoService.listar(req.query);
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
}

async function stats(req, res, next) {
  try {
    const resultado = await productoService.obtenerStats();
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
}

async function obtenerPorId(req, res, next) {
  try {
    const producto = await productoService.obtenerPorId(req.params.id);
    res.status(200).json(producto);
  } catch (error) {
    next(error);
  }
}

async function crear(req, res, next) {
  try {
    const producto = await productoService.crear(req.body);
    res.status(201).json(producto);
  } catch (error) {
    next(error);
  }
}

async function actualizar(req, res, next) {
  try {
    const producto = await productoService.actualizar(req.params.id, req.body);
    res.status(200).json(producto);
  } catch (error) {
    next(error);
  }
}

async function eliminar(req, res, next) {
  try {
    await productoService.eliminar(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

async function cambiarEstado(req, res, next) {
  try {
    const producto = await productoService.cambiarEstado(req.params.id, req.body.activo);
    res.status(200).json(producto);
  } catch (error) {
    next(error);
  }
}

module.exports = { listar, stats, obtenerPorId, crear, actualizar, eliminar, cambiarEstado };
