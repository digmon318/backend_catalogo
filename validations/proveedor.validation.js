const AppError = require("../helpers/AppError");

function esStringNoVacio(valor) {
  return typeof valor === "string" && valor.trim().length > 0;
}

function validarCrearProveedor(req, res, next) {
  const { nombre, slug } = req.body || {};

  if (!esStringNoVacio(nombre)) {
    return next(new AppError("El campo 'nombre' es obligatorio", 400, "NOMBRE_INVALIDO"));
  }

  if (!esStringNoVacio(slug)) {
    return next(new AppError("El campo 'slug' es obligatorio", 400, "SLUG_INVALIDO"));
  }

  next();
}

function validarActualizarProveedor(req, res, next) {
  const { nombre } = req.body || {};

  if (nombre !== undefined && !esStringNoVacio(nombre)) {
    return next(new AppError("El campo 'nombre' no puede estar vacío", 400, "NOMBRE_INVALIDO"));
  }

  next();
}

module.exports = { validarCrearProveedor, validarActualizarProveedor };
