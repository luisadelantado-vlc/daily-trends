import mongoose from "mongoose";
import logger from "../utils/logger";

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/daily-trends';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 30000, 
    });
  } catch (err) {
    logger.error('Error connecting to MongoDB:', err);
    process.exit(1); 
  }
};