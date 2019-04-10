import { Router, Request, Response } from 'express';
import { Controller } from '..';
import faker from 'faker';
import ArticleModel, { Article } from '../../models/article/article';

class ArticleController implements Controller {
  public router: Router;

  public constructor() {
    this.router = Router();
    this.initialRoutes();
  }

  public initialRoutes = (): void => {
    this.router.get('/articles', this.index);
    this.router.get('/articles/:id', this.show);
  };

  /**
   * Get All Articles with desc
   * @param {Request} _
   * @param {Response} res
   */
  public index = async (_: Request, res: Response): Promise<void> => {
    try {
      const articles = await this.findArticles();
      if (articles.length < 1) {
        await this.generateArticles();
        const newArticles = await this.findArticles();
        res.json({ code: 0, data: newArticles });
      } else {
        res.json({ code: 0, data: articles });
      }
    } catch (error) {
      // TODO: Error handler
      console.error(error);
      res.sendStatus(500);
    }
  };

  /**
   * Get Article by id
   * @param {Request} req
   * @param {Response} res
   */
  public show = async (req, res): Promise<void> => {
    const id = req.params.id;
    if (!id) {
      res.status(400).send({ message: 'Invalid article id.' });
    }

    const article = await ArticleModel.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate({
        path: 'comments',
        select: 'content created_at updated_at',
        options: {
          sort: 'created_at',
        },
        populate: {
          path: 'user',
          select: 'username avatar',
        },
      })
      .exec()
      .catch(
        (error: Error): void => {
          console.log(error);
          res.status(500).send({ message: 'Unexcepted Error.' });
        }
      );
    if (article) {
      res.json({ code: 0, data: article });
    } else {
      res.status(404).send({ message: 'Article data does not exist.' });
    }
  };

  /**
   * Find articles from DB
   * @returns {Promise<Article[]>} Articles
   */
  private findArticles = (): Promise<Article[]> => {
    return ArticleModel.find()
      .populate({
        path: 'comments',
        select: 'content created_at updated_at',
        options: {
          sort: 'created_at',
        },
        populate: {
          path: 'user',
          select: 'username avatar',
        },
      })
      .sort('-created_at')
      .exec();
  };

  /**
   * Generate dummy data of Article
   * @param {Number} times Number of data
   * @returns {Promise<Array>} Result of generation
   */
  private generateArticles = (times = 12): Promise<Article[]> => {
    const dummies: object[] = [];

    // generate dummy data N times
    for (let i = 0; i < times; i++) {
      const dummy = {
        title: faker.name.title(),
        content: faker.lorem.sentence(10).repeat(100),
        category: faker.name.jobType(),
        tags: faker.lorem.words(),
      };
      dummies.push(dummy);
    }
    return ArticleModel.insertMany(dummies);
  };
}

export default ArticleController;
