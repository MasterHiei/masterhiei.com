import { CleanEnv, cleanEnv, host, port, str } from 'envalid';

export interface Env extends CleanEnv {
  HOST: string;
  PORT: number;
  API_PREFIX: string;
  DB_URI: string;
  DB_NAME: string;
  TOKEN_SECRET: string;
  TOKEN_EXPIRES_IN: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  BCRYPT_SALT_ROUND: string;
}

const validateEnv = (): Readonly<Env> =>
  cleanEnv(process.env, {
    HOST: host(),
    PORT: port(),
    API_PREFIX: str(),
    DB_URI: str(),
    DB_NAME: str(),
    TOKEN_SECRET: str(),
    TOKEN_EXPIRES_IN: str(),
    GITHUB_CLIENT_ID: str(),
    GITHUB_CLIENT_SECRET: str(),
    BCRYPT_SALT_ROUND: str(),
  });

export default validateEnv;
