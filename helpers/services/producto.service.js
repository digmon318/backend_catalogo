const productoRepository = require("../repositories/producto.repository");
const Proveedor = require("../../models/proveedor.model");
const AppError = require("../AppError");

async function listar({ page = 1, limit = 20, categoria, proveedor, disponible, activo }) {
  const filtro = {};

  if (categoria) filtro.categoria = categoria.toLowerCase();
  if (disponible !== undefined) filtro.disponible = disponible === "true";
  // Filtro explícito de activo/inactivo. Si no se envía, no se filtra por
  // este campo (así el panel admin puede pedir "todos" sin pasar el
  // parámetro). El catálogo público siempre debe enviar activo=true.
  if (activo !== undefined) filtro.activo = activo === "true";

  if (proveedor) {
    // acepta id o slug de proveedor
    if (proveedor.match(/^[0-9a-fA-F]{24}$/)) {
      filtro.proveedorId = proveedor;
    } else {
      const prov = await Proveedor.findOne({ slug: proveedor });
      filtro.proveedorId = prov ? prov._id : null;
    }
  }

  const pageNum = Math.max(1, Number(page) || 1);
  // Se amplía el tope de 100 a 500 para permitir tablas administrativas
  // completas sin necesidad de paginar manualmente.
  const limitNum = Math.min(500, Math.max(1, Number(limit) || 20));
  const skip = (pageNum - 1) * limitNum;

  const [data, total] = await Promise.all([
    productoRepository.find(filtro, { skip, limit: limitNum }),
    productoRepository.count(filtro)
  ]);

  return { data, page: pageNum, limit: limitNum, total };
}

async function obtenerStats() {
  return productoRepository.stats();
}

async function obtenerPorId(id) {
  const producto = await productoRepository.findById(id);
  if (!producto) throw new AppError("Producto no encontrado", 404, "NO_ENCONTRADO");
  return producto;
}

async function crear(datos) {
  const proveedor = await Proveedor.findById(datos.proveedorId);
  if (!proveedor) throw new AppError("proveedorId no existe", 404, "PROVEEDOR_NO_EXISTE");

  const existente = await productoRepository.findBySku(datos.sku);
  if (existente) throw new AppError("sku duplicado", 409, "SKU_DUPLICADO");

  return productoRepository.create(datos);
}

async function actualizar(id, datos) {
  if (datos.sku) {
    const existente = await productoRepository.findBySku(datos.sku);
    if (existente && existente._id.toString() !== id) {
      throw new AppError("sku duplicado", 409, "SKU_DUPLICADO");
    }
  }

  const producto = await productoRepository.updateById(id, datos);
  if (!producto) throw new AppError("Producto no encontrado", 404, "NO_ENCONTRADO");
  return producto;
}

async function eliminar(id) {
  const producto = await productoRepository.deleteById(id);
  if (!producto) throw new AppError("Producto no encontrado", 404, "NO_ENCONTRADO");
  return producto;
}

async function cambiarEstado(id, activo) {
  if (typeof activo !== "boolean") {
    throw new AppError("El campo 'activo' debe ser booleano", 400, "ACTIVO_INVALIDO");
  }
  const producto = await productoRepository.updateEstado(id, activo);
  if (!producto) throw new AppError("Producto no encontrado", 404, "NO_ENCONTRADO");
  return producto;
}

module.exports = { listar, obtenerStats, obtenerPorId, crear, actualizar, eliminar, cambiarEstado };
