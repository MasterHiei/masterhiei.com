const co = require('co');
const User = require('../../models/user/user');
const token = require('../../utils/token');

/**
 * User login
 * @param {Request} req
 * @param {Response} res
 */
exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
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
 * @param {Response} res
 */
exports.logout = (_, res) => {
  res.json({ code: 0 });
};

/**
 * Query user
 * @param {Request} req
 * @param {Response} res
 */
exports.user = async (req, res) => {
  const email = req.email;
  if (!email) {
    res.json({ code: 400, message: 'Invalid email.' });
  } else {
    const user = await queryUserByEmail(email).catch(error => {
      console.log(error);
      res.json({ code: 500, message: 'Unexcepted Error.' });
    });
    res.json({ code: 0, user: user });
  }
};

/**
 * Check Email is valid or not
 * @param {Request} req
 * @param {Response} res
 */
exports.validate = async (req, res) => {
  const { email } = req.body;
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email || !pattern.test(email)) {
    res.json({ code: 400, message: 'Invalid email.' });
  } else {
    const user = await queryUserByEmail(email).catch(error => {
      console.log(error);
      res.json({ code: 500, message: 'Unexcepted Error.' });
    });
    if (user) {
      res.json({ code: 0 });
    }
  }
};

/**
 * Authenticate User
 * @param {String} email
 * @param {String} password
 * @returns {Promise<Any>} User
 */
const authenticate = (email, password) => {
  return User.findOne()
    .where('email')
    .in(email)
    .where('password')
    .in(password)
    .exec();
};

/**
 * Query user by Email
 * @param {String} email
 * @returns {Promise<Any>} User
 */
const queryUserByEmail = email => {
  return User.findOne()
    .where('email')
    .in(email)
    .exec();
};
