import express from 'express';
import { getNews, createNews, getNewsByCategory, updateNews, deleteNews, getNewsByDate } from '../controllers/feed.controller';

const router = express.Router();


router.get('/feed', getNews); 
router.post('/feed/createNew', createNews); 
router.get('/feed/category/:category', getNewsByCategory); 
router.put('/feed/updateNew/:id', updateNews); 
router.delete('/feed/deleteNew/:id', deleteNews); 
router.get('/feed/date/:date', getNewsByDate); 

export default router;