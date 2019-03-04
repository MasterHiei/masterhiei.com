const User = require('../../models/user/user');
const token = require('../../utils/token');

/**
 * User login
 * @param {Request} req
 * @param {Response} res
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.json({ code: 400, message: 'Invalid email or password.' });
    return;
  }
  try {
    const user = await queryUserByEmail(email);
    const isMatched = user.compare(password);
    if (isMatched) {
      const accessToken = token.sign(user);
      res.json({ code: 0, token: accessToken });
    } else {
      res.json({ code: 400, message: 'Invalid email or password.' });
    }
  } catch (error) {
    console.log(error);
    res.json({ code: 500, message: 'Unexcepted Error.' });
  }
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
exports.show = async (req, res) => {
  const email = req.email;
  if (!email) {
    res.json({ code: 400, message: 'Invalid email.' });
  } else {
    const user = await queryUserByEmail(email).catch(error => {
      console.log(error);
      res.json({ code: 500, message: 'Unexcepted Error.' });
    });
    res.json({ code: 0, users: user });
  }
};

/**
 * Create new user
 * @param {Request} req
 * @param {Response} res
 */
exports.create = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.json({ code: 400, message: 'Invalid email or password.' });
  } else {
    const user = new User({ email: email });
    user.password = user.hash(password);
    user.save(error => {
      if (error) {
        res.json({ code: 500, message: 'Unexcepted Error.' });
      } else {
        res.json({ code: 0 });
      }
    });
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
    if (!user) {
      res.json({ code: 0 });
    } else {
      res.json({ code: 409, message: 'Duplicate Email Address.' });
    }
  }
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
