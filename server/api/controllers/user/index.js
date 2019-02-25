const co = require('co');
const User = require('../../models/user/user');

/**
 * User Login
 * @param {Request} req
 * @param {Response} res
 */
exports.login = (req, res) => {
  const { email, password } = req.body;

  co(function*() {
    const user = yield authenticate(email, password);
    if (user) {
      res.json({ code: 0, data: user });
    } else {
      res.json({ code: 400, message: 'Invalid email or password.' });
    }
  }).catch(() => {
    res.json({ code: 400, message: 'Invalid email or password.' });
  });
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
