import { Request, Response } from 'express';
import { validationResult } from 'express-validator/check';
import consola from 'consola';
import ArticleModel from '../../models/article';

/**
 * Return articles using passed parameters
 * @param req
 * @param res
 */
const index = (req: Request, res: Response): void => {
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

  Promise.all([articlesQuery.exec(), countQuery.exec()])
    .then(
      ([articles, totalCount]): void => {
        // Set response
        res.status(200).json({ articles, totalCount });
      }
    )
    .catch(
      (error): void => {
        consola.error(error);
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
const show = (req: Request, res: Response): void => {
  // Check validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  // Find data from database
  const id = req.params.id;
  ArticleModel.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
    .exec()
    .then(
      (article): void => {
        // Set response
        if (article != null) {
          res.status(200).json({ article });
        } else {
          res.status(404).json({
            error: {
              param: 'id',
              value: id,
              msg: 'Data does not exist.',
            },
          });
        }
      }
    )
    .catch(
      (error): void => {
        consola.error(error);
        // Set response
        res.status(500).json({ error: { msg: 'Failed to query documents.' } });
      }
    );
};

export default { index, show };
