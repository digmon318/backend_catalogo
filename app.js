const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const productoRoutes = require("./routes/producto.routes");
const proveedorRoutes = require("./routes/proveedor.routes");
const categoriaRoutes = require("./routes/categoria.routes");
const usuarioRoutes = require("./routes/usuario.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors()); // el frontend (Vite, puerto distinto) necesita esto para poder llamar a la API
app.use(express.json());

app.get("/health", (req, res) => {
  const mongoUp = require("mongoose").connection.readyState === 1;
  res.status(mongoUp ? 200 : 503).json({
    status: mongoUp ? "ok" : "degraded",
    mongo: mongoUp ? "up" : "down"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/proveedores", proveedorRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/usuarios", usuarioRoutes);

// Sirve el frontend ya compilado (resultado de "npm run build" en /frontend,
// que cae directo en esta carpeta gracias al outDir configurado en vite.config.js).
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// El router de Vue usa modo "history", así que cualquier ruta que no sea
// de la API (/login, /catalog, /products, etc.) debe devolver el index.html
// para que Vue Router la resuelva del lado del cliente.
app.get(/^(?!\/api).*/, (req, res, next) => {
  res.sendFile(path.join(publicPath, "index.html"), (err) => {
    if (err) next(); // si no existe (aún no se ha hecho el build), sigue al 404/errorHandler
  });
});

app.use(errorHandler); // siempre al final

module.exports = app;
