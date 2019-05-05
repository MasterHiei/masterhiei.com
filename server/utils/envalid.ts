import { CleanEnv, cleanEnv, host, port, str, num } from 'envalid';

// Environment variables declaration
export interface Env extends CleanEnv {
  HOST: string;
  PORT: number;
  API_PREFIX: string;
  DOMAIN: string;
  DB_URI: string;
  DB_NAME: string;
  TOKEN_SECRET: string;
  TOKEN_EXPIRES_IN: string;
  GITHUB_OWNER: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  BCRYPT_SALT_ROUND: number;
  PAGE_LIMIT: number;
  COMMENTS_PEPO: string;
  COMMENTS_LABEL: string;
  COMMENTS_LIMIT: number;
}

// Validate
const validateEnv = (): Readonly<Env> =>
  cleanEnv(process.env, {
    HOST: host(),
    PORT: port(),
    API_PREFIX: str(),
    DOMAIN: str(),
    DB_URI: str(),
    DB_NAME: str(),
    TOKEN_SECRET: str(),
    TOKEN_EXPIRES_IN: str(),
    GITHUB_OWNER: str(),
    GITHUB_CLIENT_ID: str(),
    GITHUB_CLIENT_SECRET: str(),
    BCRYPT_SALT_ROUND: num(),
    PAGE_LIMIT: num(),
    COMMENTS_PEPO: str(),
    COMMENTS_LABEL: str(),
    COMMENTS_LIMIT: num(),
  });

export default validateEnv();
