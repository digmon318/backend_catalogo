const mongoose = require("mongoose");
const env = require("./helpers/env");

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("MongoDB conectado correctamente");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
