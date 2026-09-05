/**
 * Asigna una foto acorde al producto a los productos que todavía no
 * tienen "imagenUrl" (por ejemplo, los 20 productos de prueba
 * TEST-001..TEST-020 creados por seedProductos.js con imagenUrl: null).
 *
 * Usa LoremFlickr (helpers/imagenProducto.js) con una palabra clave por
 * SKU (o por categoría si el SKU no está mapeado) y un "lock" fijo
 * derivado del SKU, así cada producto siempre obtiene la misma imagen y
 * esa imagen sí corresponde al producto (no una foto aleatoria sin
 * relación, como pasaba antes con picsum.photos). No depende de ninguna
 * API key. Son fotos de referencia (no fotos reales tomadas del
 * producto propio) — reemplázalas cuando tengas fotografías reales,
 * editando el producto desde el panel admin o subiendo tus propias URLs.
 *
 * Uso:
 *   npm run actualizar:imagenes
 *
 * Por defecto es seguro correrlo varias veces: solo actualiza productos
 * cuyo imagenUrl esté vacío o nulo, nunca sobreescribe uno que ya exista
 * (por ejemplo, una foto real que un admin haya cargado a mano).
 *
 * Si ya habías corrido una versión anterior de este script (la que usaba
 * picsum.photos con fotos aleatorias) y quieres reemplazar esos links
 * viejos por los nuevos, acordes al producto, agrega la bandera
 * --forzar-pruebas. Esto SOLO sobreescribe los 20 productos de prueba
 * TEST-001..TEST-020 (los que están mapeados en helpers/imagenProducto.js),
 * nunca toca imágenes de productos reales que no estén en ese mapa:
 *
 *   npm run actualizar:imagenes -- --forzar-pruebas
 */
require("dotenv").config();
const mongoose = require("mongoose");
const env = require("../helpers/env");
const Producto = require("../models/producto.model");
const { imagenParaProducto, KEYWORDS_POR_SKU } = require("../helpers/imagenProducto");

async function run() {
  await mongoose.connect(env.MONGO_URI);
  console.log("MongoDB conectado. Actualizando imágenes de productos...\n");

  const forzarPruebas = process.argv.includes("--forzar-pruebas");

  const filtro = forzarPruebas
    ? { sku: { $in: Object.keys(KEYWORDS_POR_SKU) } }
    : { $or: [{ imagenUrl: null }, { imagenUrl: "" }, { imagenUrl: { $exists: false } }] };

  const productos = await Producto.find(filtro);

  if (productos.length === 0) {
    console.log(
      forzarPruebas
        ? "No se encontraron productos de prueba (TEST-001..TEST-020) en la base."
        : "Todos los productos ya tienen imagenUrl. Nada que hacer."
    );
  } else {
    let actualizados = 0;
    for (const producto of productos) {
      const imagenUrl = imagenParaProducto(producto.sku, producto.categoria);
      await Producto.updateOne({ _id: producto._id }, { $set: { imagenUrl } });
      actualizados++;
      console.log(`✓ ${producto.sku} — ${producto.nombre} -> ${imagenUrl}`);
    }
    console.log(`\nListo. ${actualizados} producto(s) actualizados con imagen.`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("Error actualizando imágenes:", err);
  process.exit(1);
});
