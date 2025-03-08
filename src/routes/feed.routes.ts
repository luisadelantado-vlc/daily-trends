import express from 'express';
import { getNews, createNews } from '../controllers/feed.controller';

const router = express.Router();

router.get('/feed', getNews);
router.post('/feed/createNew', createNews);

export default router;