import { Request, Response } from 'express';
import { validationResult } from 'express-validator/check';
import consola from 'consola';
import ArticleModel from '../../models/article';

/**
 * Get all tags in article
 * @param res
 */
const index = (_, res: Response): void => {
  ArticleModel.aggregate()
    .unwind('tags')
    .group({ _id: '$tags', value: { $sum: 1 } })
    .project({ _id: 0, name: '$_id', value: 1 })
    .exec()
    .then(
      (tags): void => {
        // Set response
        res.json(tags);
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
 * Find articles by tag
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
  const tag = req.params.tag;
  ArticleModel.find({ tags: tag })
    .exec()
    .then(
      (article): void => {
        // Set response
        res.json({ article });
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
