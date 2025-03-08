import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/daily-trends";

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1);
  }
};
