const AppError = require("../helpers/AppError");

function esStringNoVacio(valor) {
  return typeof valor === "string" && valor.trim().length > 0;
}

function validarCrearCategoria(req, res, next) {
  const { slug, nombre } = req.body || {};

  if (!esStringNoVacio(slug)) {
    return next(new AppError("El campo 'slug' es obligatorio", 400, "SLUG_INVALIDO"));
  }

  if (!esStringNoVacio(nombre)) {
    return next(new AppError("El campo 'nombre' es obligatorio", 400, "NOMBRE_INVALIDO"));
  }

  next();
}

function validarActualizarCategoria(req, res, next) {
  const { nombre } = req.body || {};

  if (nombre !== undefined && !esStringNoVacio(nombre)) {
    return next(new AppError("El campo 'nombre' no puede estar vacío", 400, "NOMBRE_INVALIDO"));
  }

  next();
}

module.exports = { validarCrearCategoria, validarActualizarCategoria };
