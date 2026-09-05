const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../../models/usuario.model");
const AppError = require("../AppError");
const env = require("../env");

const SALT_ROUNDS = 10;

async function register({ email, password, rol }) {
  const existente = await Usuario.findOne({ email });

  if (existente) {
    throw new AppError("Email ya registrado", 409, "EMAIL_DUPLICADO");
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const usuario = await Usuario.create({
    email,
    password: passwordHash,
    rol: rol || "user"
  });

  return {
    id: usuario._id,
    email: usuario.email,
    rol: usuario.rol
  };
}

async function login({ email, password }) {
  const usuario = await Usuario.findOne({ email }).select("+password");

  if (!usuario) {
    throw new AppError("Credenciales inválidas", 401, "CREDENCIALES_INVALIDAS");
  }

  const passwordValido = await bcrypt.compare(password, usuario.password);

  if (!passwordValido) {
    throw new AppError("Credenciales inválidas", 401, "CREDENCIALES_INVALIDAS");
  }

  const token = jwt.sign(
    { sub: usuario._id, rol: usuario.rol },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );

  return { token, rol: usuario.rol, email: usuario.email };
}

module.exports = { register, login };
