const mongoose = require("mongoose");
// Modelo de Producto. No depende de otros archivos del proyecto.

const productoSchema = new mongoose.Schema(
  {
    sku: { type: String, required: true, unique: true, trim: true },
    nombre: { type: String, required: true, minlength: 1, trim: true },
    precio: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    categoria: { type: String, required: true, minlength: 1, trim: true, lowercase: true, index: true },
    descripcion: { type: String, default: null },
    imagenUrl: { type: String, default: null },
    proveedorId: { type: mongoose.Schema.Types.ObjectId, ref: "Proveedor", required: true, index: true },
    disponible: { type: Boolean, default: false },
    // Activo/Inactivo es una decisión manual del administrador (activar o
    // desactivar el producto), independiente de "disponible" (que se
    // deriva automáticamente del stock). Un producto inactivo nunca debe
    // aparecer en el catálogo público, sin importar el stock que tenga.
    activo: { type: Boolean, default: true, index: true }
  },
  { timestamps: true }
);

// disponible se deriva siempre de stock, sin importar lo que venga en el body
productoSchema.pre("save", function (next) {
  this.disponible = this.stock > 0;
  next();
});

productoSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.stock !== undefined) {
    update.disponible = update.stock > 0;
  }
  next();
});

module.exports = mongoose.model("Producto", productoSchema, "productos");
