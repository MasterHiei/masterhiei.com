import { Article } from '../../server/models/article';

/**
 * Article of API response
 * @interface Article
 */
export interface Article {
  id: string;
  title: Article['title'];
  content: Article['content'];
  image: Article['image'];
  tags: Article['tags'];
  stars: Article['stars'];
  views: Article['views'];
  created_at: Article['created_at'];
  updated_at: Article['updated_at'];
}
