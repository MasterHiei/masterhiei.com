import faker from 'faker';
import { Request, Response } from 'express';
import ArticleModel, { Article } from '../models/article';

/**
 * Find articles from DB
 * @returns {Promise<Article[]>} Articles
 */
const findArticles = (page: number, limit: number): Promise<Article[]> => {
  const skip = page === 1 ? 0 : page * limit;
  return ArticleModel.find()
    .skip(skip)
    .limit(Number(limit))
    .populate({
      path: 'comments',
      select: 'content created_at updated_at',
      options: {
        sort: 'created_at',
      },
      populate: {
        path: 'user',
        select: 'username avatar',
      },
    })
    .sort('-created_at')
    .exec();
};

/**
 * Generate dummy data of Article
 * @param {Number} times Number of data
 * @returns {Promise<Array>} Result of generation
 */
const generateArticles = (times: number = 12): Promise<Article[]> => {
  const dummies: object[] = [];

  // generate dummy data N times
  for (let i = 0; i < times; i++) {
    const dummy = {
      title: faker.name.title(),
      content: faker.lorem.sentence(10).repeat(100),
      category: faker.name.jobType(),
      tags: faker.lorem.words(),
    };
    dummies.push(dummy);
  }
  return ArticleModel.insertMany(dummies);
};

/**
 * Get All Articles with desc
 * @param {Request} req
 * @param {Response} res
 */
const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page, limit } = req.query;
    const articles = await findArticles(page, limit);
    if (articles.length < 1) {
      await generateArticles();
      const newArticles = await findArticles(page, limit);
      res.json({ code: 0, data: newArticles });
    } else {
      res.json({ code: 0, data: articles });
    }
  } catch (error) {
    // TODO: Error handler
    console.error(error);
    res.sendStatus(500);
  }
};

/**
 * Get Article by id
 * @param {Request} req
 * @param {Response} res
 */
const show = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({ message: 'Invalid article id.' });
  }

  const article = await ArticleModel.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true }
  )
    .populate({
      path: 'comments',
      select: 'content created_at updated_at',
      options: {
        sort: 'created_at',
      },
      populate: {
        path: 'user',
        select: 'username avatar',
      },
    })
    .exec()
    .catch(
      (error: Error): void => {
        console.log(error);
        res.status(500).send({ message: 'Unexcepted Error.' });
      }
    );
  if (article) {
    res.json({ code: 0, data: article });
  } else {
    res.status(404).send({ message: 'Article data does not exist.' });
  }
};

export default { index, show };
