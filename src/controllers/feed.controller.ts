import { Request, Response, NextFunction } from 'express';
import {
  getAllNews,
  createNew,
  getAllNewsByCategory,
  updateNewById,
  deleteNewById,
  getAllNewsByDate
} from '../services/feed.service';
import logger from '../utils/logger';

export const getNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const news = await getAllNews();
    res.status(200).json(news);
  } catch (error) {
    logger.error('Error getting news:', error);
    next(error);
  }
};

export const createNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const news = await createNew(req.body);
    res.status(201).json(news);
  } catch (error) {
    logger.error('Error creating news:', error);
    next(error);
  }
};

export const getNewsByCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const news = await getAllNewsByCategory(req.params.category);
    res.status(200).json(news);
  } catch (error) {
    logger.error('Error getting news by category:', error);
    next(error);
  }
};

export const updateNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedNews = await updateNewById(req.params.id, req.body);
    if (!updatedNews) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.status(200).json(updatedNews);
  } catch (error) {
    logger.error('Error updating news:', error);
    next(error);
  }
};

export const deleteNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await deleteNewById(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.status(204).send();
  } catch (error) {
    logger.error ('Error deleting news:', error);
    next(error);
  }
};

export const getNewsByDate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const news = await getAllNewsByDate(req.params.date);
    res.status(200).json(news);
  } catch (error) {
    logger.error('Error getting news by date:', error);
    next(error);
  }
};
