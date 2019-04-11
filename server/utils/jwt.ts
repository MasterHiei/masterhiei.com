import jwt from 'jsonwebtoken';
import env from './envalid';

/**
 * Obtain token secret from the environment variables
 * @returns {String} Token secret
 * @throws Will throw a error if token secret is null or undefined
 */
const secret = (): string => {
  const secret = env.TOKEN_SECRET;
  if (secret == null) throw new Error('Token secret is null or undefined.');
  return secret;
};

/**
 * Sign a token with HMAC SHA256(default)
 * @param {Object} user
 * @returns {String} Token String
 * @throws Will throw a error if token secret is null or undefined
 */
const sign = (user: object): string => {
  return jwt.sign(user, secret(), {
    expiresIn: env.TOKEN_EXPIRES_IN,
  });
};

/**
 * Verify a token string
 * @param {String} token
 * @returns {Object} Result of verify
 * @throws Will throw a error if token secret is null or undefined
 */
const verify = (token: string): object | string => {
  return jwt.verify(token, secret());
};

export default { sign, verify };
