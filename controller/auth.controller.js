const authService = require("../helpers/services/auth.service");

async function register(req, res, next) {
  try {
    const { email, password, rol } = req.body;
    const usuario = await authService.register({ email, password, rol });
    res.status(201).json(usuario);
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const resultado = await authService.login({ email, password });
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login };
