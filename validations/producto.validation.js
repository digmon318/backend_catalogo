const AppError = require("../helpers/AppError");

function esStringNoVacio(valor) {
  return typeof valor === "string" && valor.trim().length > 0;
}

function validarCrearProducto(req, res, next) {
  const { sku, nombre, precio, stock, categoria, proveedorId } = req.body || {};

  if (!esStringNoVacio(sku)) {
    return next(new AppError("El campo 'sku' es obligatorio", 400, "SKU_INVALIDO"));
  }

  if (!esStringNoVacio(nombre)) {
    return next(new AppError("El campo 'nombre' es obligatorio", 400, "NOMBRE_INVALIDO"));
  }

  if (typeof precio !== "number" || precio < 0) {
    return next(new AppError("El campo 'precio' debe ser un número mayor o igual a 0", 400, "PRECIO_INVALIDO"));
  }

  if (stock !== undefined && (typeof stock !== "number" || stock < 0)) {
    return next(new AppError("El campo 'stock' debe ser un número mayor o igual a 0", 400, "STOCK_INVALIDO"));
  }

  if (!esStringNoVacio(categoria)) {
    return next(new AppError("El campo 'categoria' es obligatorio", 400, "CATEGORIA_INVALIDA"));
  }

  if (!esStringNoVacio(proveedorId)) {
    return next(new AppError("El campo 'proveedorId' es obligatorio", 400, "PROVEEDOR_INVALIDO"));
  }

  next();
}

function validarActualizarProducto(req, res, next) {
  const { precio, stock } = req.body || {};

  if (precio !== undefined && (typeof precio !== "number" || precio < 0)) {
    return next(new AppError("El campo 'precio' debe ser un número mayor o igual a 0", 400, "PRECIO_INVALIDO"));
  }

  if (stock !== undefined && (typeof stock !== "number" || stock < 0)) {
    return next(new AppError("El campo 'stock' debe ser un número mayor o igual a 0", 400, "STOCK_INVALIDO"));
  }

  next();
}

module.exports = { validarCrearProducto, validarActualizarProducto };
