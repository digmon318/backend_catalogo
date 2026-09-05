const express = require("express");
const controller = require("../controller/producto.controller");
const auth = require("../middlewares/auth");
const rol = require("../middlewares/rol");
const { validarCrearProducto, validarActualizarProducto } = require("../validations/producto.validation");

const router = express.Router();

// El listado de estadísticas sigue requiriendo autenticación
// (debe ir antes de "/:id" para que no sea interpretado como un id)
router.get("/stats", auth, controller.stats);

// Lectura pública del catálogo (no requiere sesión iniciada)
router.get("/", controller.listar);
router.get("/:id", controller.obtenerPorId);

router.post("/", auth, rol("admin"), validarCrearProducto, controller.crear);
router.put("/:id", auth, rol("admin"), validarActualizarProducto, controller.actualizar);
// Acción explícita para activar/desactivar sin tener que enviar todo el
// producto por PUT. Solo el administrador puede usarla.
router.patch("/:id/estado", auth, rol("admin"), controller.cambiarEstado);
router.delete("/:id", auth, rol("admin"), controller.eliminar);

module.exports = router;
