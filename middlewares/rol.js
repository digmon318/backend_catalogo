const AppError = require("../helpers/AppError");

// Uso: rol("admin") como middleware en una ruta
module.exports = function rol(rolRequerido) {
  return (req, res, next) => {
    if (!req.usuario) {
      return next(new AppError("No autenticado", 401, "NO_AUTENTICADO"));
    }

    if (req.usuario.rol !== rolRequerido) {
      return next(
        new AppError(
          "No tienes permisos para esta acción",
          403,
          "PERMISOS_INSUFICIENTES"
        )
      );
    }

    next();
  };
};
