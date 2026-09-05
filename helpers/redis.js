const Redis = require("ioredis");
const env = require("./env");

// Nota: si tu proveedor de Redis (ej. Redis Cloud) exige TLS, agrega
// REDIS_TLS=true a tu .env. Si no, déjala sin definir.
const redisClient = new Redis({
  host: env.REDIS_HOST,
  port: Number(env.REDIS_PORT),
  password: env.REDIS_PASSWORD,
  tls: process.env.REDIS_TLS === "true" ? {} : undefined
});

redisClient.on("connect", () => {
  console.log("Redis conectado correctamente");
});

redisClient.on("error", (err) => {
  console.error("Error de conexión con Redis:", err.message);
});

module.exports = redisClient;
