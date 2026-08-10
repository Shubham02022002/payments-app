import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    const host = connection.connection.host;
    console.log(
      `DB connection established successfully: ${host.slice(0, 6)}...${host.slice(-6)}`,
    );
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
