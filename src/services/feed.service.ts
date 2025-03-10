import { Request, Response } from 'express';
import Feed from '../models/feed.model';
import { IFeedDocument } from '../models/feed.model';
import logger from '../utils/logger';

export const getAllNews = async (): Promise<IFeedDocument[]> => {
    try {
        const news = await Feed.find().lean();
        return news;
    } catch (err: any) {
        throw new Error('Failed to retrieve news: ' + err.message);
    }
};

export const createNew = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, url, source, date, category, image, featured } = req.body;

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
        logger.error(err);
        res.status(500).json({
            message: 'Error adding the new.',
            error: err.message,
        });
    }
}