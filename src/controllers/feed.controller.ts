import { Request, Response } from 'express';
import {getAllNews, createNew, getAllNewsByCategory, updateNewById, deleteNewById, getAllNewsByDate} from '../services/feed.service';

export const getNews = async (req: Request, res: Response) => {
  try {
    const news = await getAllNews();
    res.json(news);
  } catch (err: any) {
    res.status(500).json({ message: 'Failed to retrieve news' });
  }
};

export const createNews = async (req: Request, res: Response) => {
  try {
    await createNew(req, res);
  } catch (err: any) {
    res.status(500).json({ message: 'Failed to create news' });
  }
};

export const getNewsByCategory = async (req: Request, res: Response) => {
  try {
    const news = await getAllNewsByCategory(req, res);
    res.json(news);
  } catch (err: any) {
    res.status(500).json({ message: 'Failed to retrieve news' });
  }
};

export const updateNews = async (req: Request, res: Response) => {
  try {
    const updatedNews = await updateNewById(req, res);
    res.json(updatedNews);
  } catch (err: any) {
    res.status(500).json({ message: 'Failed to update news' });
  }
};

export const deleteNews = async (req: Request, res: Response) => {
  try {
    const news = await deleteNewById(req, res);
    res.json(news);  
  } catch (err: any) {
    res.status(500).json({ message: 'Failed to delete news' });
  }
};

export const getNewsByDate = async (req: Request, res: Response) => {
  try {
    const news = await getAllNewsByDate(req, res);
    res.json(news);
  } catch (err: any) {
    res.status(500).json({ message: 'Failed to retrieve news' });
  }
};

