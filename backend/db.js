const mongoose = require("mongoose");
const dotenv = require("dotenv/config");

async function connectDB() {
  const connection = await mongoose.connect(process.env.MONGO_URI);
  console.log(connection.connection.host);
}

module.exports = connectDB;
