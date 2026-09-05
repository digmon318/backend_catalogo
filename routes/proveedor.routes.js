const express = require("express");
const controller = require("../controller/proveedor.controller");
const auth = require("../middlewares/auth");
const rol = require("../middlewares/rol");
const { validarCrearProveedor, validarActualizarProveedor } = require("../validations/proveedor.validation");

const router = express.Router();

// Lectura pública del catálogo (no requiere sesión iniciada)
router.get("/", controller.listar);
router.get("/:id", controller.obtenerPorId);

router.post("/", auth, rol("admin"), validarCrearProveedor, controller.crear);
router.put("/:id", auth, rol("admin"), validarActualizarProveedor, controller.actualizar);
router.delete("/:id", auth, rol("admin"), controller.eliminar);

module.exports = router;
