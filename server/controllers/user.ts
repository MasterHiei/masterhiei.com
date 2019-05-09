import { Request, Response } from 'express';
import UserModel, { User } from '../models/user';
import jwt from '../utils/jwt';

/**
 * Find a user by Email
 * @param {String} email
 * @returns {Promise<User | null>} User Document
 */
const findUserByEmail = (email: string): Promise<User | null> => {
  return UserModel.findOne()
    .where('email')
    .in([email])
    .exec();
};

/**
 * Generate a dummy email address
 * @param {String} id UserModel id
 * @param {String} type Account type
 */
const dummyEmail = (id: string, type: string): string => {
  return `dummy.${id}${new Date().getTime()}@${type}.com`;
};

/**
 * User login
 * @param {Request} req
 * @param {Response} res
 */
const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.json({ code: 400, message: 'Invalid email or password.' });
    return;
  }
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      res.json({ code: 400, message: 'Invalid email or password.' });
      return;
    }

    const isMatched = user.compare(password);
    if (isMatched) {
      const token = jwt.sign(user.toObject());
      res.json({ code: 0, token: token });
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
const logout = (_: Request, res: Response): void => {
  res.json({ code: 0 });
};

/**
 * Get user from jwt
 * @param {Request} req
 * @param {Response} res
 */
const me = (req: Request, res: Response): void => {
  const token = req.token;
  if (!token) {
    res.status(401).send({ message: 'Missing authentication  token.' });
    return;
  }

  try {
    const user = jwt.verify(token);
    res.json({ code: 0, user: user });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: 'The authentication token is invalid or has expired.',
    });
  }
};

/**
 * Create a new user
 * @param {Request} req
 * @param {Response} res
 */
const create = (req: Request, res: Response): void => {
  const { email, username, password } = req.body;
  if (!email || !password || !username) {
    res.json({ code: 400, message: 'Invalid register info.' });
  } else {
    const user = new UserModel({ email: email, username: username });
    user.password = user.hash(password);
    user.save(
      (error: Error): void => {
        if (error) {
          res.json({ code: 500, message: 'Unexcepted Error.' });
        } else {
          res.json({ code: 0 });
        }
      }
    );
  }
};

/**
 * Fetch social user profile
 * @param {Request} req
 * @param {Response} res
 */
const fetchSocial = async (req: Request, res: Response): Promise<void> => {
  const { type, socialId, username, avatar } = req.body;
  if (!type || !socialId || !username || !avatar) {
    res.status(400).send({ message: 'Invalid user data.' });
    return;
  }

  const email = dummyEmail(socialId, type);
  const user = await UserModel.findOneAndUpdate(
    { social_id: socialId },
    {
      email: email,
      username: username,
      social_id: socialId,
      avatar: avatar,
    },
    { upsert: true }
  )
    .exec()
    .catch(
      (error: Error): void => {
        console.log(error);
        res.status(500).send({ message: 'Unexcepted Error.' });
      }
    );
  res.json({ code: 0, user: user });
};

/**
 * Check Email is valid or not
 * @param {Request} req
 * @param {Response} res
 */
const validate = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email || !pattern.test(email)) {
    res.json({ code: 400, message: 'Invalid email.' });
  } else {
    const user = await findUserByEmail(email).catch(
      (error: Error): void => {
        console.log(error);
        res.json({ code: 500, message: 'Unexcepted Error.' });
      }
    );
    if (!user) {
      res.json({ code: 0 });
    } else {
      res.json({ code: 409, message: 'Duplicate Email Address.' });
    }
  }
};

export default { login, logout, me, validate, create, fetchSocial };
