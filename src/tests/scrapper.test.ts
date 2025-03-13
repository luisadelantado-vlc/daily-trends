import { Page } from 'playwright'; 
import { fetchArticlesForMedia } from '../services/scraper.service';

describe('should pass', () => {
    test('should pass', async() => {
      const mockPage = {
        goto: jest.fn().mockResolvedValue(null),
        $$eval: jest.fn().mockResolvedValue(['https://example.com/article1']),
        $: jest.fn().mockResolvedValue({ textContent: 'Some content' }),
      } as unknown as Page;  


      /*const mediaItem = {
        url: 'https://example.com',
        numArticles: 2,
        articleSelector: '.article-title',
        descriptionSelector: '.article-description',
        categoryPosition: 3,
        title: 'Example Source',
        categories: ['tech', 'news'],
      }; */

      
      //await fetchArticlesForMedia(mockContext, mediaItem);

      
      expect(mockPage.goto).toHaveBeenCalledTimes(3); 
      expect(mockPage.$).toHaveBeenCalledTimes(4); 
    });
});
