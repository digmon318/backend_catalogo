const proveedorService = require("../helpers/services/proveedor.service");

async function listar(req, res, next) {
  try {
    const resultado = await proveedorService.listar(req.query);
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
}

async function obtenerPorId(req, res, next) {
  try {
    const proveedor = await proveedorService.obtenerPorId(req.params.id);
    res.status(200).json(proveedor);
  } catch (error) {
    next(error);
  }
}

async function crear(req, res, next) {
  try {
    const proveedor = await proveedorService.crear(req.body);
    res.status(201).json(proveedor);
  } catch (error) {
    next(error);
  }
}

async function actualizar(req, res, next) {
  try {
    const proveedor = await proveedorService.actualizar(req.params.id, req.body);
    res.status(200).json(proveedor);
  } catch (error) {
    next(error);
  }
}

async function eliminar(req, res, next) {
  try {
    await proveedorService.eliminar(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = { listar, obtenerPorId, crear, actualizar, eliminar };
