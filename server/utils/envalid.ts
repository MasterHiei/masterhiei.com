import { CleanEnv, cleanEnv, host, port, str, num } from 'envalid';

// Environment variables declaration
export interface Env extends CleanEnv {
  HOST: string;
  PORT: number;
  API_PREFIX: string;
  DB_URI: string;
  DB_NAME: string;
  GITHUB_OWNER: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  COMMENTS_PEPO: string;
  COMMENTS_LABEL: string;
  COMMENTS_LIMIT: number;
  PAGE_LIMIT: number;
}

// Validate
const validateEnv = (): Readonly<Env> =>
  cleanEnv(process.env, {
    HOST: host(),
    PORT: port(),
    API_PREFIX: str(),
    DB_URI: str(),
    DB_NAME: str(),
    GITHUB_OWNER: str(),
    GITHUB_CLIENT_ID: str(),
    GITHUB_CLIENT_SECRET: str(),
    COMMENTS_PEPO: str(),
    COMMENTS_LABEL: str(),
    COMMENTS_LIMIT: num(),
    PAGE_LIMIT: num(),
  });

export default validateEnv();
