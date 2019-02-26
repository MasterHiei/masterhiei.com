const jwt = require('jsonwebtoken');
const { auth } = require(`../../env/${process.env.NODE_ENV}`);

/**
 * Sign a token with HMAC SHA256(default)
 * @param {JSON} user
 * @returns {String} Token String
 */
exports.sign = user => {
  jwt.sign(
    {
      email: user.email,
      username: user.username,
    },
    auth.secret,
    {
      expiresIn: auth.expiresIn,
    }
  );
};

/**
 * Verify a token string
 * @param {String} token
 * @returns Result of verify
 */
exports.verify = token => jwt.verify(token, auth.secret);
