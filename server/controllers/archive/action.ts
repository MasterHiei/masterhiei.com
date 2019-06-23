import dayjs from 'dayjs';
import { Request, Response, NextFunction } from 'express';
import ArticleModel from '../../models/article';
import InternalServerException from '../../exceptions/InternalServerException';

/**
 * Returns articles created in last year
 * @param _ Request
 * @param res Response
 * @param next NextFunction
 */
const index = (_: Request, res: Response, next: NextFunction): void => {
  // Query a particular date range
  const endDay = dayjs();
  const startDay = endDay
    .subtract(1, 'year')
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0);

  // Find data from database
  const articlesQuery = ArticleModel.find()
    .where('created_at')
    .gte(startDay.toDate())
    .lte(endDay.toDate())
    .sort('-created_at -_id');
  const yearMonthDayQuery = ArticleModel.aggregate()
    .project({
      date: {
        $dateToString: { date: '$created_at', format: '%Y-%m-%d' },
      },
    })
    .group({
      _id: '$date',
      value: { $sum: 1 },
    })
    .project({ _id: 0, date: '$_id', value: 1 })
    .sort('-date');

  Promise.all([articlesQuery.exec(), yearMonthDayQuery.exec()])
    .then(([articles, yearMonthDay]): void => {
      // Set response
      res.status(200).json({ articles, yearMonthDay });
    })
    .catch((): void => {
      // Pass error to Express
      next(new InternalServerException('Failed to query documents.'));
    });
};

export default { index };
