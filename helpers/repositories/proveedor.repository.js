const Proveedor = require("../../models/proveedor.model");
const Producto = require("../../models/producto.model");

async function find(filtro, { skip, limit }) {
  return Proveedor.find(filtro).skip(skip).limit(limit).sort({ createdAt: -1 });
}

async function count(filtro) {
  return Proveedor.countDocuments(filtro);
}

async function findById(id) {
  return Proveedor.findById(id);
}

async function findByNombreOrSlug(nombre, slug) {
  return Proveedor.findOne({ $or: [{ nombre }, { slug }] });
}

async function create(data) {
  return Proveedor.create(data);
}

async function updateById(id, data) {
  return Proveedor.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

async function deleteById(id) {
  return Proveedor.findByIdAndDelete(id);
}

async function tieneProductos(id) {
  const total = await Producto.countDocuments({ proveedorId: id });
  return total > 0;
}

module.exports = { find, count, findById, findByNombreOrSlug, create, updateById, deleteById, tieneProductos };
