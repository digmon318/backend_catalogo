const bcrypt = require("bcrypt");
const usuarioRepository = require("../repositories/usuario.repository");
const AppError = require("../AppError");

async function listar() {
  return usuarioRepository.find();
}

async function actualizar(id, datos) {
  const cambios = { ...datos };

  // si el admin manda una nueva contraseña, se hashea igual que en register
  if (cambios.password) {
    cambios.password = await bcrypt.hash(cambios.password, 10);
  }

  const usuario = await usuarioRepository.updateById(id, cambios);
  if (!usuario) throw new AppError("Usuario no encontrado", 404, "NO_ENCONTRADO");
  return usuario;
}

async function eliminar(id) {
  const usuario = await usuarioRepository.deleteById(id);
  if (!usuario) throw new AppError("Usuario no encontrado", 404, "NO_ENCONTRADO");
  return usuario;
}

module.exports = { listar, actualizar, eliminar };
