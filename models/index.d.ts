// Data Models
export interface LocalUser {
  id: string;
  role: string[];
  email: string;
  username: string;
  avatar: string;
  social_id: string;
  created_at: string;
  updated_at: string;
  isFetched?: boolean;
}

export interface GithubUser {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
  isFetched?: boolean;
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
  user: LocalUser;
  content: string;
}
