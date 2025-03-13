import { getAllNews, createNew, getAllNewsByCategory, updateNewById, deleteNewById, getAllNewsByDate } from '../../services/feed.service';
import Feed, { IFeedDocument } from '../../models/feed.model';
import mongoose from 'mongoose';
import FeedModel from '../../models/feed.model';

jest.mock('../../models/feed.model');


describe('Feed Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('getAllNews should return all news', async () => {
        const mockNews = {
            _id: '1',
            title: 'Test News',
            category: 'Technology',
            date: new Date().toISOString(),
        };
        (Feed.find as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue([mockNews]),
        });
        const news = await getAllNews();
        expect(news).toEqual([mockNews]);
    });

    test('getAllNewsByCategory should return all news filtered with the category', async () => {
        const mockNewsArr: IFeedDocument[] = [ 
            {
              _id: '1',
              title: 'Noticia de Deportes',
              category: 'internacional',
              date: '2023-10-26', 
            } as unknown as IFeedDocument,
            {
              _id: '2',
              title: 'Noticia de Tecnología',
              category: 'Tecnología',
              date: '2023-10-26',
            } as unknown as IFeedDocument,
          ];

        const category = 'internacional';
        const expectedNews = mockNewsArr.filter((news) => news.category === category);

        (Feed.find as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue(expectedNews),
        });

        const news = await getAllNewsByCategory(category);

        expect(news).toEqual(expectedNews);
        expect(Feed.find).toHaveBeenCalledWith({ category });
    });

    test('should update the news and return the updated news', async () => {

        const mockNews: IFeedDocument = {
            _id: new mongoose.Types.ObjectId().toString(), 
            title: 'Noticia Original',
            category: 'Original',
            date: new Date().toISOString(),
            description: 'Descripcion',
            url: 'url',
            source: 'source',
          } as unknown as IFeedDocument;
        
          const updateData: Partial<IFeedDocument> = {
            title: 'Noticia Actualizada',
            category: 'economia',
          };

        const updatedNews: IFeedDocument = new FeedModel({
            ...mockNews,
            ...updateData,
          });

        (Feed.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedNews);

        const result = await updateNewById(mockNews._id.toString(), updateData);

        expect(result).toEqual(updatedNews);
        expect(Feed.findByIdAndUpdate).toHaveBeenCalledWith(mockNews._id, updateData, { new: true });
    });

});
