import { Request, Response } from 'express';
import { validationResult } from 'express-validator/check';
import ArticleModel from '../models/article';

/**
 * Find Articles
 * @param {Request} req
 * @param {Response} res
 */
const index = async (req: Request, res: Response): Promise<void> => {
  // Validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  // Get query parameter
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;

  // Query database
  const articlesQuery = ArticleModel.find()
    .skip(skip)
    .limit(limit)
    .sort('-created_at');
  const countQuery = ArticleModel.find().estimatedDocumentCount();

  const [articles, totalCount] = await Promise.all([
    articlesQuery.exec(),
    countQuery.exec(),
  ]);

  // Set response
  res.json({ articles, totalCount });
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
    .exec()
    .catch(
      (error: Error): void => {
        console.log(error);
        res.status(500).send({ message: 'Unexcepted Error.' });
      }
    );
  if (article) {
    res.json({ article });
  } else {
    res.status(404).send({ message: 'Article data does not exist.' });
  }
};

export default { index, show };
