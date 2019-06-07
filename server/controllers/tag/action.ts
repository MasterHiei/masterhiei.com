import { Request, Response } from 'express';
import { validationResult } from 'express-validator/check';
import consola from 'consola';
import ArticleModel from '../../models/article';
import { Tag } from '@/models/tag';

/**
 * Get all tags in article
 * @param _ Request
 * @param res Response
 */
const index = (_: Request, res: Response): void => {
  ArticleModel.aggregate()
    .unwind('tags')
    .group({ _id: '$tags', value: { $sum: 1 } })
    .project({ _id: 0, name: '$_id', value: 1 })
    .sort('-value -name')
    .exec()
    .then((tags: Tag[]): void => {
      // Set response
      res.status(200).json({ tags });
    })
    .catch((error: Error): void => {
      consola.error(error);
      // Set response
      res.status(500).json({ error: { msg: 'Failed to query documents.' } });
    });
};

/**
 * Find articles by tag
 * @param req Request
 * @param res Response
 */
const show = (req: Request, res: Response): void => {
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
  const tag = req.params.tag;
  ArticleModel.find({ tags: tag })
    .skip(skip)
    .limit(limit)
    .exec()
    .then((articles): void => {
      // Set response
      res.status(200).json({ articles });
    })
    .catch((error: Error): void => {
      consola.error(error);
      // Set response
      res.status(500).json({ error: { msg: 'Failed to query documents.' } });
    });
};

export default { index, show };
