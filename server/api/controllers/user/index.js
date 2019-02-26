const co = require('co');
const User = require('../../models/user/user');
const token = require('../../utils/token');

/**
 * User login
 */
exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email.length || !password.length) {
    res.json({ code: 400, message: 'Invalid email or password.' });
    return;
  }

  co(function*() {
    const user = yield authenticate(email, password);
    if (user) {
      const accessToken = token.sign(user);
      res.json({ code: 0, token: accessToken });
    } else {
      res.json({ code: 400, message: 'Invalid email or password.' });
    }
  }).catch(() => {
    res.json({ code: 400, message: 'Invalid email or password.' });
  });
};

/**
 * User logout
 */
exports.logout = (_, res) => {
  res.clearCookie('auth._token.local');
  res.json({ code: 0 });
};

/**
 * Authenticate User
 * @param {String} email
 * @param {String} password
 */
const authenticate = (email, password) => {
  return User.findOne()
    .where('email')
    .in(email)
    .where('password')
    .in(password)
    .exec();
};
