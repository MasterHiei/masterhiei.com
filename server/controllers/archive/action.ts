import dayjs from 'dayjs';
import { Request, Response } from 'express';
import consola from 'consola';
import ArticleModel from '../../models/article';

/**
 * Return articles created in last year
 * @param _
 * @param res
 */
const index = (_: Request, res: Response): void => {
  // Find data from database
  const now = dayjs();
  const articlesQuery = ArticleModel.find()
    .where('created_at')
    .lte(now.toDate())
    .gte(now.subtract(1, 'year'))
    .sort('-created_at -_id');
  const statisticsQuery = ArticleModel.aggregate()
    .project({
      yearMonthDay: {
        $dateToString: { date: '$created_at', format: '%Y-%m-%d' },
      },
    })
    .group({
      _id: '$yearMonthDay',
      value: { $sum: 1 },
    })
    .project({ _id: 0, yearMonthDay: '$_id', value: 1 })
    .sort('-yearMonthDay');

  Promise.all([articlesQuery.exec(), statisticsQuery.exec()])
    .then(
      ([articles, statistics]): void => {
        // Set response
        res.status(200).json({ articles, statistics });
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

export default { index };
