const express = require("express");
const { register, login } = require("../controller/auth.controller");
const { validarRegister, validarLogin } = require("../validations/auth.validation");

const router = express.Router();

router.post("/register", validarRegister, register);
router.post("/login", validarLogin, login);

module.exports = router;
