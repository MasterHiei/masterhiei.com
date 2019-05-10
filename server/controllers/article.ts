import { Request, Response } from 'express';
import { validationResult } from 'express-validator/check';
import ArticleModel from '../models/article';

/**
 * Return articles using passed parameters
 * @param req
 * @param res
 */
const index = async (req: Request, res: Response): Promise<void> => {
  // Check validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  // Get query parameter
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;

  // Find data from database
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
 * Return an article depending the ID
 * @param req
 * @param res
 */
const show = async (req: Request, res: Response): Promise<void> => {
  // Check validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  // Find data from database
  const id = req.params.id;
  const article = await ArticleModel.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true }
  ).exec();

  // Set response
  if (article != null) {
    res.json({ article });
  } else {
    res.status(404).send({
      errors: [
        {
          param: 'id',
          value: id,
          msg: 'Data does not exist.',
        },
      ],
    });
  }
};

export default { index, show };
