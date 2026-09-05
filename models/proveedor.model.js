const mongoose = require("mongoose");

const proveedorSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    contactoEmail: { type: String, default: null },
    logoUrl: { type: String, default: null },
    activo: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Proveedor", proveedorSchema, "proveedores");
