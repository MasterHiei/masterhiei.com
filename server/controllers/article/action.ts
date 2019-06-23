import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import ArticleModel from '../../models/article';
import InternalServerException from '../../exceptions/InternalServerException';
import NotFoundException from '../../exceptions/NotFoundException';

/**
 * Returns articles using passed parameters
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
const index = (req: Request, res: Response, next: NextFunction): void => {
  // Handle validation errors
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
    .sort('-created_at -_id');
  const countQuery = ArticleModel.find().estimatedDocumentCount();

  Promise.all([articlesQuery.exec(), countQuery.exec()])
    .then(([articles, totalCount]): void => {
      // Set response
      res.status(200).json({ articles, totalCount });
    })
    .catch((): void => {
      // Pass error to Express
      next(new InternalServerException('Failed to query documents.'));
    });
};

/**
 * Returns an article depending the ID
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
const show = (req: Request, res: Response, next: NextFunction): void => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  // Find data from database
  const id = req.params.id;
  ArticleModel.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
    .exec()
    .then((article): void => {
      // Set response
      if (article != null) {
        res.status(200).json({ article });
      } else {
        next(new NotFoundException(id));
      }
    })
    .catch((): void => {
      // Pass error to Express
      next(new InternalServerException('Failed to query documents.'));
    });
};

export default { index, show };
