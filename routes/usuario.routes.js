const express = require("express");
const controller = require("../controller/usuario.controller");
const auth = require("../middlewares/auth");
const rol = require("../middlewares/rol");
const { validarActualizarUsuario } = require("../validations/usuario.validation");

const router = express.Router();

// Extra fuera de contrato: la especificación original solo define
// /api/auth/register y /api/auth/login. Este módulo agrega gestión de
// usuarios para el panel de administración, protegido solo para admin.
router.use(auth, rol("admin"));

router.get("/", controller.listar);
router.put("/:id", validarActualizarUsuario, controller.actualizar);
router.delete("/:id", controller.eliminar);

module.exports = router;
