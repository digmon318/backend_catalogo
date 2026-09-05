const Producto = require("../../models/producto.model");

async function find(filtro, { skip, limit }) {
  return Producto.find(filtro).skip(skip).limit(limit).sort({ createdAt: -1 });
}

async function count(filtro) {
  return Producto.countDocuments(filtro);
}

async function findById(id) {
  return Producto.findById(id);
}

async function findBySku(sku) {
  return Producto.findOne({ sku });
}

async function create(data) {
  return Producto.create(data);
}

async function updateById(id, data) {
  return Producto.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

async function updateEstado(id, activo) {
  return Producto.findByIdAndUpdate(id, { activo }, { new: true, runValidators: true });
}

async function deleteById(id) {
  return Producto.findByIdAndDelete(id);
}

async function stats() {
  const totalProductos = await Producto.countDocuments();
  const activos = await Producto.countDocuments({ activo: true });
  const inactivos = await Producto.countDocuments({ activo: false });

  const promedio = await Producto.aggregate([
    { $group: { _id: null, precioPromedio: { $avg: "$precio" } } }
  ]);

  const porCategoria = await Producto.aggregate([
    { $group: { _id: "$categoria", count: { $sum: 1 } } },
    { $project: { _id: 0, categoria: "$_id", count: 1 } },
    { $sort: { count: -1 } }
  ]);

  return {
    totalProductos,
    activos,
    inactivos,
    precioPromedio: promedio[0] ? Math.round(promedio[0].precioPromedio * 100) / 100 : 0,
    porCategoria
  };
}

module.exports = { find, count, findById, findBySku, create, updateById, updateEstado, deleteById, stats };
