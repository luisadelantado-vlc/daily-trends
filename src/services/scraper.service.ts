import { chromium, Page, BrowserContext, Browser } from 'playwright';
import FeedModel from '../models/feed.model';
import logger from '../utils/logger';
import { readFileSync } from 'fs';
import path from 'path';

interface MediaItem {
  url: string;
  numArticles: number;
  articleSelector: string;
  descriptionSelector: string;
  categoryPosition: number;
  title: string;
  categories: string[];
}

interface Config {
  media: MediaItem[];
  categories: string[];
}

const configFilePath = path.join(__dirname, '../config/scrapper-config.json');
const configFile: Config = JSON.parse(readFileSync(configFilePath, 'utf-8'));

export const getTextContentFromSelector = async (page: Page, selector: string): Promise<string> => {
  const element = await page.$(selector);
  if (element) {
    const text = await element.textContent(); 
    return text?.trim() || ''; 
  }
  return ''; 
};

export const fetchArticlesForMedia = async (context: BrowserContext, mediaItem: MediaItem): Promise<void> => {
  const page = await context.newPage();
  await page.goto(mediaItem.url);

  const linkUrls = await page.$$eval('a', (elements: HTMLAnchorElement[]) => elements.map((element: HTMLAnchorElement) => element.href));

  const filteredLinks = [...new Set(linkUrls)]  
  .filter((link: string) => configFile.categories.some((category: string) => link.includes(category)))
  .slice(0, mediaItem.numArticles);

  logger.info('Filtered links: ' + filteredLinks);

  const fetchPromises = filteredLinks.map(async (link) => {
    try {
      const articlePage = await context.newPage();
      await articlePage.goto(link);

      const titleArticle = await getTextContentFromSelector(articlePage, mediaItem.articleSelector);
      if (!titleArticle) {
        logger.warn(`No title found for: ${link}`);
        return;
      }

      const description = await getTextContentFromSelector(articlePage, mediaItem.descriptionSelector); 
      if (!description) {
        logger.warn(`No description found for: ${link}`);
        return;
      }

      const category = (link as string).split('/')[mediaItem.categoryPosition].replace('.html', '');

      const newFeed = new FeedModel({
        title: titleArticle || 'No title',
        description: description || 'No description',
        url: link || 'No url',
        source: mediaItem.title || 'No source',
        date: new Date(),
        category: category || 'No category', 
      });

      await newFeed.save();
      logger.info(`Scraping done for: ${titleArticle}`);

    } catch (error) {
      logger.error(`Error scraping article ${link}: `, error);
    }
  });

  await Promise.all(fetchPromises);
};

export const startScrapping = async (): Promise<void> => {
  try {
    const browser: Browser = await chromium.launch();
    const context: BrowserContext = await browser.newContext();

    for (const mediaItem of configFile.media) {
      await fetchArticlesForMedia(context, mediaItem); 
    }

    await browser.close();

  } catch (error) {
    logger.error('Error during scraping: ', error);
  }
};
