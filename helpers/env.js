require("dotenv").config();

const REQUIRED_VARS = [
  "PORT",
  "MONGO_URI",
  "REDIS_HOST",
  "REDIS_PORT",
  "JWT_SECRET",
  "JWT_EXPIRES_IN"
];

function validateEnv() {
  const faltantes = REQUIRED_VARS.filter((key) => !process.env[key]);

  if (faltantes.length > 0) {
    console.error(
      `❌ Faltan variables de entorno obligatorias: ${faltantes.join(", ")}`
    );
    console.error("Revisa tu archivo .env (usa .env.example como guía).");
    process.exit(1);
  }
}

validateEnv();

module.exports = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || undefined,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN
};
