import express from "express";
import cors from "cors";
import feedRoutes from './routes/feed.routes';
import { startScrapping } from './services/scraper.service';

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", feedRoutes);
startScrapping();

export default app;
