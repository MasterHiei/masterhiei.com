import jwt from 'jsonwebtoken';

class JSONWebToken {
  /**
   * Sign a token with HMAC SHA256(default)
   * @param {Object} user
   * @returns {String} Token String
   * @throws Will throw a error if token secret is null or undefined
   */
  public sign = (user: object): string => {
    return jwt.sign(user, this.secret(), {
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    });
  };

  /**
   * Verify a token string
   * @param {String} token
   * @returns {Object} Result of verify
   * @throws Will throw a error if token secret is null or undefined
   */
  public verify = (token: string): object | string => {
    return jwt.verify(token, this.secret());
  };

  /**
   * Obtain token secret from the environment variables
   * @returns {String} Token secret
   * @throws Will throw a error if token secret is null or undefined
   */
  private secret = (): string => {
    const secret = process.env.TOKEN_SECRET;
    if (secret == null) throw new Error('Token secret is null or undefined.');
    return secret;
  };
}

export default JSONWebToken;
