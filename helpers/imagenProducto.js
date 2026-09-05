/**
 * Genera la URL de imagen de un producto usando LoremFlickr
 * (https://loremflickr.com), un servicio gratuito de imágenes de relleno
 * que sirve fotos reales de Flickr con licencia Creative Commons,
 * filtradas por palabra clave.
 *
 * A diferencia de picsum.photos (foto aleatoria sin relación con el
 * producto), aquí cada SKU tiene asignadas palabras clave que describen
 * el producto real, así la imagen que se muestra sí corresponde a lo que
 * se está vendiendo (unos audífonos muestran audífonos, no un paisaje).
 *
 * Se usa el parámetro "lock" (un número fijo derivado del SKU) para que
 * la imagen asignada a un producto sea siempre la misma en cada carga,
 * en vez de cambiar aleatoriamente cada vez que se pide.
 */

// Palabras clave en inglés (el motor de búsqueda de Flickr funciona mejor
// así) para cada SKU de prueba. Si se agregan productos nuevos con SKU
// distinto, se puede sumar su entrada aquí; si no está mapeado, se cae a
// una búsqueda genérica por categoría (ver imagenParaProducto más abajo).
const KEYWORDS_POR_SKU = {
  "TEST-001": "bluetooth-headphones",
  "TEST-002": "usb-c-charger",
  "TEST-003": "wireless-mouse",
  "TEST-004": "mechanical-keyboard",
  "TEST-005": "power-bank",
  "TEST-006": "smartwatch",
  "TEST-007": "bedsheets",
  "TEST-008": "cookware-pots",
  "TEST-009": "table-lamp",
  "TEST-010": "closet-organizer",
  "TEST-011": "handheld-vacuum",
  "TEST-012": "cotton-tshirt",
  "TEST-013": "slim-jeans",
  "TEST-014": "rain-jacket",
  "TEST-015": "sports-cap",
  "TEST-016": "soccer-ball",
  "TEST-017": "yoga-mat",
  "TEST-018": "dumbbells",
  "TEST-019": "building-blocks-toy",
  "TEST-020": "teddy-bear"
};

// Fallback por categoría, para productos que no estén en el mapa anterior.
const KEYWORDS_POR_CATEGORIA = {
  electronica: "electronics-gadget",
  hogar: "home-goods",
  ropa: "clothing-apparel",
  deportes: "sports-equipment",
  juguetes: "kids-toy"
};

// Convierte el SKU en un número estable (no criptográfico, solo para el
// parámetro "lock" de LoremFlickr) para que el mismo producto siempre
// obtenga la misma foto entre corridas del script.
function numeroEstablePara(texto) {
  let hash = 0;
  for (let i = 0; i < texto.length; i++) {
    hash = (hash * 31 + texto.charCodeAt(i)) % 1000000;
  }
  return Math.abs(hash) + 1;
}

function imagenParaProducto(sku, categoria) {
  const keyword =
    KEYWORDS_POR_SKU[sku] || KEYWORDS_POR_CATEGORIA[categoria] || "product";
  const lock = numeroEstablePara(sku);
  return `https://loremflickr.com/600/400/${keyword}?lock=${lock}`;
}

module.exports = { imagenParaProducto, KEYWORDS_POR_SKU, KEYWORDS_POR_CATEGORIA };
