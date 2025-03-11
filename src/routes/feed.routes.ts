import express from 'express';
import { getNews, createNews, getNewsByCategory, updateNews, deleteNews, getNewsByDate } from '../controllers/feed.controller';

const router = express.Router();

// CRUD operations for the feed
router.get('/feed', getNews); //DONE
router.post('/feed/createNew', createNews); //DONE
router.get('/feed/category/:category', getNewsByCategory); //DONE
router.put('/feed/updateNew/:id', updateNews); //DONE
router.delete('/feed/deleteNew/:id', deleteNews); //DONE
router.get('/feed/date/:date', getNewsByDate); //DONE

export default router;