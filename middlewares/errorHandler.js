const AppError = require("../helpers/AppError");

module.exports = function errorHandler(err, req, res, next) {
  // Error de duplicado de Mongo (índice único)
  if (err.code === 11000) {
    const campo = Object.keys(err.keyValue || {})[0] || "campo";
    return res.status(409).json({
      mensaje: `${campo} duplicado`,
      codigo: "DUPLICADO"
    });
  }

  // Errores de validación de Mongoose
  if (err.name === "ValidationError") {
    return res.status(400).json({
      mensaje: "Error de validación",
      codigo: "VALIDACION",
      detalles: Object.values(err.errors).map((e) => e.message)
    });
  }

  // Errores tipados propios de la app
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      mensaje: err.message,
      codigo: err.codigo
    });
  }

  // Cualquier otro error no controlado
  console.error(err);
  return res.status(500).json({
    mensaje: "Error interno del servidor",
    codigo: "ERROR_INTERNO"
  });
};
