const AppError = require("../helpers/AppError");

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

function validarRegister(req, res, next) {
  const { email, password, rol } = req.body || {};

  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
    return next(new AppError("Email inválido o faltante", 400, "EMAIL_INVALIDO"));
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    return next(new AppError("La contraseña debe tener al menos 6 caracteres", 400, "PASSWORD_INVALIDO"));
  }

  if (rol !== undefined && !["admin", "user"].includes(rol)) {
    return next(new AppError("El rol debe ser 'admin' o 'user'", 400, "ROL_INVALIDO"));
  }

  next();
}

function validarLogin(req, res, next) {
  const { email, password } = req.body || {};

  if (!email || typeof email !== "string") {
    return next(new AppError("Email requerido", 400, "EMAIL_REQUERIDO"));
  }

  if (!password || typeof password !== "string") {
    return next(new AppError("Contraseña requerida", 400, "PASSWORD_REQUERIDO"));
  }

  next();
}

module.exports = { validarRegister, validarLogin };
