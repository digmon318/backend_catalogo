const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, default: null },
    imagenUrl: { type: String, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Categoria", categoriaSchema, "categorias");
