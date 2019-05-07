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
