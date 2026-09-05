const usuarioService = require("../helpers/services/usuario.service");

async function listar(req, res, next) {
  try {
    const usuarios = await usuarioService.listar();
    res.status(200).json(usuarios);
  } catch (error) {
    next(error);
  }
}

async function actualizar(req, res, next) {
  try {
    const usuario = await usuarioService.actualizar(req.params.id, req.body);
    res.status(200).json(usuario);
  } catch (error) {
    next(error);
  }
}

async function eliminar(req, res, next) {
  try {
    await usuarioService.eliminar(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = { listar, actualizar, eliminar };
