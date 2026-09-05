const jwt = require("jsonwebtoken");
const env = require("../helpers/env");
const AppError = require("../helpers/AppError");

module.exports = function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return next(new AppError("Token no proporcionado", 401, "NO_TOKEN"));
  }

  const token = header.split(" ")[1];

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    // payload = { sub: usuarioId, rol }
    req.usuario = { id: payload.sub, rol: payload.rol };
    next();
  } catch (error) {
    next(new AppError("Token inválido o expirado", 401, "TOKEN_INVALIDO"));
  }
};
