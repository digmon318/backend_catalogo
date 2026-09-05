const express = require("express");
const controller = require("../controller/categoria.controller");
const auth = require("../middlewares/auth");
const rol = require("../middlewares/rol");
const { validarCrearCategoria, validarActualizarCategoria } = require("../validations/categoria.validation");

const router = express.Router();

// Lectura pública del catálogo (no requiere sesión iniciada)
router.get("/", controller.listar);
router.get("/:slug", controller.obtenerPorSlug);

// Extra fuera de contrato (ver nota en categoria.service.js)
router.post("/", auth, rol("admin"), validarCrearCategoria, controller.crear);
router.put("/:id", auth, rol("admin"), validarActualizarCategoria, controller.actualizar);
router.delete("/:id", auth, rol("admin"), controller.eliminar);

module.exports = router;
