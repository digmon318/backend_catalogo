const AppError = require("../helpers/AppError");

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

function validarActualizarUsuario(req, res, next) {
  const { email, password, rol } = req.body || {};

  if (email !== undefined && (typeof email !== "string" || !EMAIL_REGEX.test(email))) {
    return next(new AppError("Email inválido", 400, "EMAIL_INVALIDO"));
  }

  if (password !== undefined && (typeof password !== "string" || password.length < 6)) {
    return next(new AppError("La contraseña debe tener al menos 6 caracteres", 400, "PASSWORD_INVALIDO"));
  }

  if (rol !== undefined && !["admin", "user"].includes(rol)) {
    return next(new AppError("El rol debe ser 'admin' o 'user'", 400, "ROL_INVALIDO"));
  }

  next();
}

module.exports = { validarActualizarUsuario };
