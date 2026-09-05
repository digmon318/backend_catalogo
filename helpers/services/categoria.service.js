const categoriaRepository = require("../repositories/categoria.repository");
const AppError = require("../AppError");

async function listar() {
  return categoriaRepository.findAll();
}

async function obtenerPorSlug(slug) {
  const categoria = await categoriaRepository.findBySlug(slug);
  if (!categoria) throw new AppError("Categoría no encontrada", 404, "NO_ENCONTRADA");
  return categoria;
}

// NOTA DE CONTRATO: la especificación original NO define POST /api/categorias
// (solo se crean automáticamente durante el import, sección 6.5). Esta función
// existe como extensión práctica para poder probar el CRUD antes de construir
// el módulo de imports. Bórrala cuando el import esté implementado si quieres
// apegarte estrictamente al contrato.
async function crear(datos) {
  const existente = await categoriaRepository.findBySlug(datos.slug);
  if (existente) throw new AppError("slug duplicado", 409, "SLUG_DUPLICADO");
  return categoriaRepository.create(datos);
}

async function actualizar(id, datos) {
  // el slug nunca se edita (es la llave que une con productos)
  const { slug, ...permitido } = datos;
  const categoria = await categoriaRepository.updateById(id, permitido);
  if (!categoria) throw new AppError("Categoría no encontrada", 404, "NO_ENCONTRADA");
  return categoria;
}

async function eliminar(id) {
  const categoria = await categoriaRepository.deleteById(id);
  if (!categoria) throw new AppError("Categoría no encontrada", 404, "NO_ENCONTRADA");
  return categoria;
}

module.exports = { listar, obtenerPorSlug, crear, actualizar, eliminar };
