import express from "express";
import cors from "cors";
import feedRoutes from './routes/feed.routes';
import { startScrapping } from './services/scraper.service';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", feedRoutes);
app.use(errorHandler);
startScrapping();

export default app;
