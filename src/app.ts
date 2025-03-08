import express from "express";
import cors from "cors";
import feedRoutes from './routes/feed.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", feedRoutes);

export default app;
