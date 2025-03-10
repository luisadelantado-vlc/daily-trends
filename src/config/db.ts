import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://mongo:27017/daily-trends', {
      serverSelectionTimeoutMS: 30000, // 30 segundos
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Termina el proceso en caso de error de conexión
  }
};