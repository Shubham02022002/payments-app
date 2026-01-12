const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  try {
    let resp = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Db connected: ${resp.connection.host}`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = dbConnect;
