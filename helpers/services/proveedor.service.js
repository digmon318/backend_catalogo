const proveedorRepository = require("../repositories/proveedor.repository");
const AppError = require("../AppError");

async function listar({ page = 1, limit = 20, activo }) {
  const filtro = {};
  if (activo !== undefined) filtro.activo = activo === "true";

  const pageNum = Math.max(1, Number(page) || 1);
  const limitNum = Math.min(100, Math.max(1, Number(limit) || 20));
  const skip = (pageNum - 1) * limitNum;

  const [data, total] = await Promise.all([
    proveedorRepository.find(filtro, { skip, limit: limitNum }),
    proveedorRepository.count(filtro)
  ]);

  return { data, page: pageNum, limit: limitNum, total };
}

async function obtenerPorId(id) {
  const proveedor = await proveedorRepository.findById(id);
  if (!proveedor) throw new AppError("Proveedor no encontrado", 404, "NO_ENCONTRADO");
  return proveedor;
}

async function crear(datos) {
  const existente = await proveedorRepository.findByNombreOrSlug(datos.nombre, datos.slug);
  if (existente) throw new AppError("nombre o slug duplicado", 409, "DUPLICADO");
  return proveedorRepository.create(datos);
}

async function actualizar(id, datos) {
  const proveedor = await proveedorRepository.updateById(id, datos);
  if (!proveedor) throw new AppError("Proveedor no encontrado", 404, "NO_ENCONTRADO");
  return proveedor;
}

async function eliminar(id) {
  const tieneProductos = await proveedorRepository.tieneProductos(id);
  if (tieneProductos) {
    throw new AppError(
      "No se puede eliminar: tiene productos asociados. Usa activo:false en su lugar",
      409,
      "INTEGRIDAD_REFERENCIAL"
    );
  }

  const proveedor = await proveedorRepository.deleteById(id);
  if (!proveedor) throw new AppError("Proveedor no encontrado", 404, "NO_ENCONTRADO");
  return proveedor;
}

module.exports = { listar, obtenerPorId, crear, actualizar, eliminar };
