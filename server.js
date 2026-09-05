const env = require("./helpers/env");
const connectDB = require("./database");
const app = require("./app");

connectDB();

app.listen(env.PORT, "0.0.0.0", () => {
  console.log(`Servidor ejecutándose en el puerto ${env.PORT}`);
});
