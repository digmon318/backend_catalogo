const Usuario = require("../../models/usuario.model");

async function find() {
  return Usuario.find();
}

async function findById(id) {
  return Usuario.findById(id);
}

async function updateById(id, data) {
  return Usuario.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

async function deleteById(id) {
  return Usuario.findByIdAndDelete(id);
}

module.exports = { find, findById, updateById, deleteById };
