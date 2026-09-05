const Categoria = require("../../models/categoria.model");

async function findAll() {
  return Categoria.find().sort({ nombre: 1 });
}

async function findBySlug(slug) {
  return Categoria.findOne({ slug });
}

async function findById(id) {
  return Categoria.findById(id);
}

async function create(data) {
  return Categoria.create(data);
}

async function updateById(id, data) {
  return Categoria.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

async function deleteById(id) {
  return Categoria.findByIdAndDelete(id);
}

module.exports = { findAll, findBySlug, findById, create, updateById, deleteById };
