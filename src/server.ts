import app from "./app";
import { connectDB } from './config/db';
import logger from "./utils/logger";

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}`);
  });
})