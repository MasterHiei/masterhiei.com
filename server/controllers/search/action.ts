import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import ArticleModel from '../../models/article';
import fuse from '../../utils/fuse';
import InternalServerException from '../../exceptions/InternalServerException';

/**
 * Returns an article list depending the search keywords
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
const index = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  // Get all articles from database
  await ArticleModel.find()
    .exec()
    .then((articles): void => {
      // Set empty array response if no data found
      if (articles.length === 0) {
        res.status(200).json({ articles: [] });
        return;
      }

      // Search by keywords
      const { keywords } = req.query;
      const results = fuse.findArticles(articles, keywords);
      res.status(200).json({ articles: results });
    })
    .catch((): void => {
      // Pass error to Express
      next(new InternalServerException('Failed to query documents.'));
    });
};

export default { index };
