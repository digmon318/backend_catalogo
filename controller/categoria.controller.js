const categoriaService = require("../helpers/services/categoria.service");

async function listar(req, res, next) {
  try {
    const categorias = await categoriaService.listar();
    res.status(200).json(categorias);
  } catch (error) {
    next(error);
  }
}

async function obtenerPorSlug(req, res, next) {
  try {
    const categoria = await categoriaService.obtenerPorSlug(req.params.slug);
    res.status(200).json(categoria);
  } catch (error) {
    next(error);
  }
}

async function crear(req, res, next) {
  try {
    const categoria = await categoriaService.crear(req.body);
    res.status(201).json(categoria);
  } catch (error) {
    next(error);
  }
}

async function actualizar(req, res, next) {
  try {
    const categoria = await categoriaService.actualizar(req.params.id, req.body);
    res.status(200).json(categoria);
  } catch (error) {
    next(error);
  }
}

async function eliminar(req, res, next) {
  try {
    await categoriaService.eliminar(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = { listar, obtenerPorSlug, crear, actualizar, eliminar };
