import { Request, Response } from 'express';
import { validationResult } from 'express-validator/check';
import ArticleModel from '../../models/article';

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

  await Promise.all([articlesQuery.exec(), countQuery.exec()])
    .then(
      ([articles, totalCount]): void => {
        // Set response
        res.json({ articles, totalCount });
      }
    )
    .catch(
      (): void => {
        // Set response
        res.status(500).json({ error: { msg: 'Failed to query documents.' } });
      }
    );
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
    res.status(404).json({
      error: {
        param: 'id',
        value: id,
        msg: 'Data does not exist.',
      },
    });
  }
};

export default { index, show };
