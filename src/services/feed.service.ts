import { Request, Response } from 'express';
import Feed from '../models/feed.model';
import { IFeedDocument } from '../models/feed.model';
import logger from '../utils/logger';

export const getAllNews = async (): Promise<IFeedDocument[]> => {
    try {
        const news = await Feed.find().lean();
        logger.info('News retrieved successfully');
        return news;
    } catch (err: any) {
        logger.error('Failed to retrieve news: '+err);
        throw new Error('Failed to retrieve news: ' + err.message);
    }
};

export const createNew = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, url, source, date, category, image, featured } = req.body;
        logger.info(`Adding a new to the feed with date: ${new Date()}`);

        const newFeed = new Feed({
            title,
            description,
            url,
            source,
            date,
            category,
            image,
            featured,
        });
    
        await newFeed.save();
    
        res.status(201).json({
            message: 'New successfully added!',
            feed: newFeed,
        });
    } catch (err: any) {
        logger.error('Error adding the new: '+err);
        res.status(500).json({
            message: 'Error adding the new',
            error: err.message,
        });
    }
}
 
export const getAllNewsByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { category } = req.params;
        const news = await Feed.find({ category }).lean();
        logger.info(`News retrieved successfully by category {category}`);
        res.json(news);
    } catch (err: any) {
        logger.error('Failed to retrieve news '+err);
        res.status(500).json({ message: 'Failed to retrieve news' });
    }
}

export const updateNewById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, description, url, source, date, category, image, featured } = req.body;
        const updatedNews = await Feed.findByIdAndUpdate(id, { title, description, url, source, date, category, image, featured }, { new: true });
        logger.info(`News updated successfully with id: ${id}`);
        res.json(updatedNews);
    } catch (err: any) {
        logger.error('Failed to update news '+err);    
        res.status(500).json({ message: 'Failed to update news' });
    }
}

export const deleteNewById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await Feed.findByIdAndDelete(id);
        logger.info(`News deleted successfully with id: ${id}`);
        res.json({ message: 'News deleted successfully' });
    } catch (err: any) {
        logger.error('Failed to delete news '+err);
        res.status(500).json({ message: 'Failed to delete news' });
    }
}

export const getAllNewsByDate = async (req: Request, res: Response): Promise<void> => {
    try {
        const { date } = req.params;
        const news = await Feed.find({ date: { $gte: new Date(date) } }).lean();
        logger.info(`News retrieved successfully by date ${date}`);
        res.json(news); 
    }
    catch (err: any) {  
        logger.error('Failed to retrieve news '+err);
        res.status(500).json({ message: 'Failed to retrieve news' });
    }
}