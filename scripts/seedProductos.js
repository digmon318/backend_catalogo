/**
 * Seed de datos de prueba para el catálogo.
 *
 * Crea (si no existen) unas categorías y proveedores de apoyo, y 20
 * productos de ejemplo con precios/stock variados y un mix de
 * activo/inactivo, listos para probar el botón Activar/Desactivar
 * tanto en /products como en /catalog (admin) y comprobar que el
 * catálogo público (/) solo muestra los activos.
 *
 * Uso:
 *   npm run seed:productos
 *
 * Es idempotente: si un producto con el mismo SKU ya existe, lo omite
 * en vez de duplicarlo. Se puede correr varias veces sin problema.
 */
require("dotenv").config();
const mongoose = require("mongoose");
const env = require("../helpers/env");

const Categoria = require("../models/categoria.model");
const Proveedor = require("../models/proveedor.model");
const Producto = require("../models/producto.model");
const { imagenParaProducto } = require("../helpers/imagenProducto");

const CATEGORIAS = [
  { slug: "electronica", nombre: "Electrónica", descripcion: "Dispositivos y accesorios electrónicos" },
  { slug: "hogar", nombre: "Hogar", descripcion: "Artículos para el hogar" },
  { slug: "ropa", nombre: "Ropa", descripcion: "Prendas de vestir" },
  { slug: "deportes", nombre: "Deportes", descripcion: "Artículos deportivos" },
  { slug: "juguetes", nombre: "Juguetes", descripcion: "Juguetes y entretenimiento" }
];

const PROVEEDORES = [
  { nombre: "TechSupply SA", slug: "techsupply-sa", contactoEmail: "ventas@techsupply.test" },
  { nombre: "Hogar Facil Ltda", slug: "hogar-facil-ltda", contactoEmail: "contacto@hogarfacil.test" },
  { nombre: "ModaWorld", slug: "modaworld", contactoEmail: "pedidos@modaworld.test" }
];

// 20 productos de prueba. "activo" se define explícitamente aquí para dejar
// un mix parejo (14 activos / 6 inactivos) y poder probar el toggle de
// inmediato. "stock" también varía para distinguir "disponible" (por stock)
// de "activo" (decisión manual del admin).
const PRODUCTOS = [
  { sku: "TEST-001", nombre: "Audífonos Bluetooth X200", precio: 89900, stock: 25, categoria: "electronica", proveedor: "techsupply-sa", activo: true, descripcion: "Audífonos inalámbricos con cancelación de ruido (producto de prueba)." },
  { sku: "TEST-002", nombre: "Cargador USB-C 30W", precio: 39900, stock: 40, categoria: "electronica", proveedor: "techsupply-sa", activo: true, descripcion: "Cargador rápido USB-C (producto de prueba)." },
  { sku: "TEST-003", nombre: "Mouse Inalámbrico Pro", precio: 54900, stock: 15, categoria: "electronica", proveedor: "techsupply-sa", activo: true, descripcion: "Mouse ergonómico inalámbrico (producto de prueba)." },
  { sku: "TEST-004", nombre: "Teclado Mecánico RGB", precio: 129900, stock: 0, categoria: "electronica", proveedor: "techsupply-sa", activo: true, descripcion: "Teclado mecánico con luces RGB, agotado (producto de prueba)." },
  { sku: "TEST-005", nombre: "Power Bank 10000mAh", precio: 69900, stock: 30, categoria: "electronica", proveedor: "techsupply-sa", activo: false, descripcion: "Batería portátil, descontinuada (producto de prueba)." },
  { sku: "TEST-006", nombre: "Smartwatch Fit 2", precio: 199900, stock: 12, categoria: "electronica", proveedor: "techsupply-sa", activo: false, descripcion: "Reloj inteligente, retirado temporalmente (producto de prueba)." },

  { sku: "TEST-007", nombre: "Juego de Sábanas Queen", precio: 74900, stock: 20, categoria: "hogar", proveedor: "hogar-facil-ltda", activo: true, descripcion: "Sábanas 100% algodón (producto de prueba)." },
  { sku: "TEST-008", nombre: "Set de Ollas Antiadherentes", precio: 219900, stock: 8, categoria: "hogar", proveedor: "hogar-facil-ltda", activo: true, descripcion: "Set de 5 ollas antiadherentes (producto de prueba)." },
  { sku: "TEST-009", nombre: "Lámpara de Mesa LED", precio: 45900, stock: 18, categoria: "hogar", proveedor: "hogar-facil-ltda", activo: true, descripcion: "Lámpara LED regulable (producto de prueba)." },
  { sku: "TEST-010", nombre: "Organizador de Closet", precio: 32900, stock: 0, categoria: "hogar", proveedor: "hogar-facil-ltda", activo: true, descripcion: "Organizador modular, agotado (producto de prueba)." },
  { sku: "TEST-011", nombre: "Aspiradora de Mano", precio: 159900, stock: 10, categoria: "hogar", proveedor: "hogar-facil-ltda", activo: false, descripcion: "Aspiradora portátil, fuera de línea (producto de prueba)." },

  { sku: "TEST-012", nombre: "Camiseta Básica Algodón", precio: 29900, stock: 60, categoria: "ropa", proveedor: "modaworld", activo: true, descripcion: "Camiseta unisex 100% algodón (producto de prueba)." },
  { sku: "TEST-013", nombre: "Jean Slim Fit", precio: 89900, stock: 35, categoria: "ropa", proveedor: "modaworld", activo: true, descripcion: "Jean corte slim (producto de prueba)." },
  { sku: "TEST-014", nombre: "Chaqueta Impermeable", precio: 149900, stock: 14, categoria: "ropa", proveedor: "modaworld", activo: true, descripcion: "Chaqueta para lluvia (producto de prueba)." },
  { sku: "TEST-015", nombre: "Gorra Deportiva", precio: 24900, stock: 50, categoria: "ropa", proveedor: "modaworld", activo: false, descripcion: "Gorra ajustable, temporada pasada (producto de prueba)." },

  { sku: "TEST-016", nombre: "Balón de Fútbol N°5", precio: 64900, stock: 22, categoria: "deportes", proveedor: "modaworld", activo: true, descripcion: "Balón oficial N°5 (producto de prueba)." },
  { sku: "TEST-017", nombre: "Colchoneta de Yoga", precio: 44900, stock: 28, categoria: "deportes", proveedor: "hogar-facil-ltda", activo: true, descripcion: "Colchoneta antideslizante (producto de prueba)." },
  { sku: "TEST-018", nombre: "Mancuernas Ajustables 10kg", precio: 179900, stock: 0, categoria: "deportes", proveedor: "techsupply-sa", activo: true, descripcion: "Par de mancuernas ajustables, agotadas (producto de prueba)." },

  { sku: "TEST-019", nombre: "Set de Bloques de Construcción", precio: 59900, stock: 33, categoria: "juguetes", proveedor: "modaworld", activo: true, descripcion: "Set de 200 piezas (producto de prueba)." },
  { sku: "TEST-020", nombre: "Peluche Oso Grande", precio: 39900, stock: 17, categoria: "juguetes", proveedor: "hogar-facil-ltda", activo: false, descripcion: "Peluche 60cm, descontinuado (producto de prueba)." }
];

async function run() {
  await mongoose.connect(env.MONGO_URI);
  console.log("MongoDB conectado. Sembrando datos de prueba...\n");

  // 1) Categorías de apoyo (se omiten las que ya existan por slug)
  for (const cat of CATEGORIAS) {
    const existente = await Categoria.findOne({ slug: cat.slug });
    if (!existente) {
      await Categoria.create(cat);
      console.log(`✓ Categoría creada: ${cat.nombre}`);
    } else {
      console.log(`· Categoría ya existía: ${cat.nombre}`);
    }
  }

  // 2) Proveedores de apoyo (se omiten los que ya existan por slug)
  const proveedorIdPorSlug = {};
  for (const prov of PROVEEDORES) {
    let doc = await Proveedor.findOne({ slug: prov.slug });
    if (!doc) {
      doc = await Proveedor.create(prov);
      console.log(`✓ Proveedor creado: ${prov.nombre}`);
    } else {
      console.log(`· Proveedor ya existía: ${prov.nombre}`);
    }
    proveedorIdPorSlug[prov.slug] = doc._id;
  }

  // 3) Productos de prueba (se omiten los que ya existan por sku)
  console.log("");
  let creados = 0;
  let omitidos = 0;

  for (const p of PRODUCTOS) {
    const existente = await Producto.findOne({ sku: p.sku });
    if (existente) {
      omitidos++;
      console.log(`· Producto ya existía, omitido: ${p.sku} — ${p.nombre}`);
      continue;
    }

    const producto = new Producto({
      sku: p.sku,
      nombre: p.nombre,
      precio: p.precio,
      stock: p.stock,
      categoria: p.categoria,
      descripcion: p.descripcion,
      // Foto real acorde al producto (no una foto aleatoria sin relación),
      // determinística por SKU. Ver scripts/actualizarImagenesProductos.js
      // para el mismo criterio aplicado a productos ya existentes en la base,
      // y helpers/imagenProducto.js para el mapeo de palabras clave.
      imagenUrl: imagenParaProducto(p.sku, p.categoria),
      proveedorId: proveedorIdPorSlug[p.proveedor],
      activo: p.activo
      // "disponible" se recalcula solo a partir del stock (ver hook pre-save
      // del modelo), no hace falta enviarlo.
    });
    await producto.save();
    creados++;
    console.log(`✓ Producto creado: ${p.sku} — ${p.nombre} (${p.activo ? "activo" : "inactivo"})`);
  }

  console.log(`\nListo. ${creados} producto(s) nuevos, ${omitidos} ya existían.`);
  const totalActivos = await Producto.countDocuments({ activo: true });
  const totalInactivos = await Producto.countDocuments({ activo: false });
  console.log(`Total en la base ahora: ${totalActivos} activos, ${totalInactivos} inactivos.`);

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("Error sembrando datos:", err);
  process.exit(1);
});
