import Feed, { IFeedDocument } from '../models/feed.model';
import logger from '../utils/logger';

export const getAllNews = async (): Promise<IFeedDocument[]> => {
    return await Feed.find().lean();
};

export const createNew = async (newsData: Partial<IFeedDocument>): Promise<IFeedDocument> => {
    logger.info(`Adding a new feed entry at: ${new Date().toISOString()}`);
    const newFeed = new Feed(newsData);
    return await newFeed.save();
};

export const getAllNewsByCategory = async (category: string): Promise<IFeedDocument[]> => {
    return await Feed.find({ category }).lean();
};

export const updateNewById = async (id: string, updateData: Partial<IFeedDocument>): Promise<IFeedDocument | null> => {
    const updatedFeed = await Feed.findByIdAndUpdate(id, updateData, { new: true });
    if (updatedFeed) {
        logger.info(`News updated successfully with id: ${id}`);
    }
    return updatedFeed;
};

export const deleteNewById = async (id: string): Promise<boolean> => {
    const result = await Feed.findByIdAndDelete(id);
    if (result) {
        logger.info(`News deleted successfully with id: ${id}`);
        return true;
    }
    return false;
};

export const getAllNewsByDate = async (date: string): Promise<IFeedDocument[]> => {
    return await Feed.find({ date: { $gte: new Date(date) } }).lean();
};
