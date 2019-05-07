export interface Article {
  id: string;
  image: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  stars: number;
  views: number;
  created_at: string;
  updated_at: string;
  modified_at: string;
}
