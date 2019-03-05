const jwt = require('jsonwebtoken');
const { auth } = require(`../../env/${process.env.NODE_ENV}`);

/**
 * Sign a token with HMAC SHA256(default)
 * @param {Object} user
 * @returns {String} Token String
 */
exports.sign = user => {
  return jwt.sign(user, auth.secret, {
    expiresIn: auth.expiresIn,
  });
};

/**
 * Verify a token string
 * @param {String} token
 * @returns Result of verify
 */
exports.verify = token => jwt.verify(token, auth.secret);
