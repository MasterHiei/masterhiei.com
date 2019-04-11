import { Router, Request, Response } from 'express';
import CommentModel from '../models/comment';
import ArticleModel from '../models/article';
import { Controller } from './interface';

class CommentController implements Controller {
  public router: Router;

  public constructor() {
    this.router = Router();
    this.initialRoutes();
  }

  public initialRoutes = (): void => {
    this.router.post('/articles/:articleId/comments', this.create);
    this.router.patch('/articles/:articleId/comments/:commentId', this.update);
    this.router.delete('/articles/:articleId/comments/:commentId', this.delete);
  };

  // TODO: Add permission check
  /**
   * Create a new Comment
   * @param {Request} req
   * @param {Response} res
   */
  public create = async (req: Request, res: Response): Promise<void> => {
    const articleId = req.params.articleId;
    const { userId, content } = req.body;
    if (!userId || !articleId || !content) {
      res.status(400).send({ message: 'Invalid POST parameters.' });
      return;
    }

    // Save comment and create data relationship
    const comment = new CommentModel({
      user: userId,
      article: articleId,
      content: content,
    });
    const newComment = await comment.save().catch(
      (error: Error): void => {
        console.log(error);
        res.status(500).send({ message: 'Unexcepted Error.' });
      }
    );
    if (newComment == null) {
      res.status(500).send({ message: 'Unexcepted Error.' });
      return;
    }
    await ArticleModel.updateOne(
      { _id: articleId },
      { $push: { comments: newComment._id } }
    )
      .exec()
      .catch(
        (error: Error): void => {
          console.log(error);
          res.status(500).send({ message: 'Unexcepted Error.' });
        }
      );
    res.json({ code: 0 });
  };

  /**
   * Update a Comment
   * @param {Request} req
   * @param {Response} res
   */
  public update = async (req: Request, res: Response): Promise<void> => {
    const commentId = req.params.commentId;
    const { content } = req.body;
    if (!commentId || !content) {
      res.status(400).send({ message: 'Invalid POST parameters.' });
      return;
    }

    await CommentModel.updateOne(
      { _id: commentId },
      { $set: { content: content } }
    )
      .exec()
      .catch(
        (error: Error): void => {
          console.log(error);
          res.status(500).send({ message: 'Unexcepted Error.' });
        }
      );
    res.json({ code: 0 });
  };

  /**
   * Delete a Comment
   * @param {Request} req
   * @param {Response} res
   */
  public delete = async (req: Request, res: Response): Promise<void> => {
    const commentId = req.params.commentId;
    if (!commentId) {
      res.status(400).send({ message: 'Invalid comment id.' });
      return;
    }

    await CommentModel.deleteOne({ _id: commentId })
      .exec()
      .catch(
        (error: Error): void => {
          console.log(error);
          res.status(500).send({ message: 'Unexcepted Error.' });
        }
      );
    res.json({ code: 0 });
  };
}

export default CommentController;
