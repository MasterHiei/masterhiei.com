import Fuse, { FuseOptions } from 'fuse.js';
import { Article } from '../models/article';

/**
 * Keyword search for articles
 * @param value Dataset to search
 * @param keywords Search keywords
 * @returns Search result
 */
const findArticles = (value: Article[], keywords: string): Article[] => {
  const options: FuseOptions<Article> = {
    keys: [
      { name: 'title', weight: 0.4 },
      { name: 'tags', weight: 0.4 },
      { name: 'content', weight: 0.2 },
    ],
  };
  const fuse = new Fuse(value, options);
  return fuse.search(keywords);
};

export default { findArticles };
