import { getTextContentFromSelector } from "../../services/scraper.service";
import { Page } from 'playwright';
describe('Scrapper service', () => {
    test('should return the text content of the selector', async () => {
        const mockPage = {
            $(selector: string) {
              if (selector === '.test-selector') {
                return Promise.resolve({ textContent: () => Promise.resolve('Test Content ') });
              }
              return Promise.resolve(null);
            },
          } as Page;
      
          const result = await getTextContentFromSelector(mockPage, '.test-selector');
          expect(result).toBe('Test Content');
    });
})