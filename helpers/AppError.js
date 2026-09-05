class AppError extends Error {
  constructor(mensaje, statusCode = 500, codigo = "ERROR_INTERNO") {
    super(mensaje);
    this.statusCode = statusCode;
    this.codigo = codigo;
  }
}

module.exports = AppError;
