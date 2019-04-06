// Data Models
export interface User {
  id: string;
  role: string[];
  email: string;
  username: string;
  avatar: string;
  social_id: string;
  created_at: string;
  updated_at: string;
  isFetched: boolean;
}

export interface Auth {
  user: User;
}

export interface Article {
  id: string;
  category: string;
  tags: string[];
  title: string;
  content: string;
  views: number;
  stars: number;
  created_at: string;
  updated_at: string;
  modified_at: string;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
}
