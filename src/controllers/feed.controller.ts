import { Request, Response } from 'express';
import FeedModel from '../models/feed.model';
import {getAllNews, createNew} from '../services/feed.service';

export const getNews = async (req: Request, res: Response) => {
  try {
    const news = await getAllNews();
    res.json(news);
  } catch (err: any) {
    res.status(500).json({ message: 'Failed to retrieve news' });
  }
};

export const createNews = async (req: Request, res: Response) => {
  res.json({ message: `${req.body}` });
  try {
    await createNew(req, res);
  } catch (err: any) {
    res.status(500).json({ message: 'Failed to create news' });
  }
};