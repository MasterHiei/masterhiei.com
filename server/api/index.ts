import express from 'express';
import UserController from './controllers/user/index';
import ArticlesController from './controllers/article/index';
import CommentController from './controllers/comment/index';

const router = express.Router();
const prefix = process.env.API_PREFIX;

// User
const userController = new UserController();
router.post(`${prefix}/login`, userController.login);
router.post(`${prefix}/logout`, userController.logout);
router.get(`${prefix}/users/me`, userController.me);
router.put(`${prefix}/users/validate`, userController.validate);
router.post(`${prefix}/users`, userController.create);
router.post(`${prefix}/users/social`, userController.fetchSocial);

// Article
const articlesController = new ArticlesController();
router.get(`${prefix}/articles`, articlesController.index);
router.get(`${prefix}/articles/:id`, articlesController.show);

// Comment
const commentController = new CommentController();
router.post(`${prefix}/articles/:articleId/comments`, commentController.create);
router.patch(
  `${prefix}/articles/:articleId/comments/:commentId`,
  commentController.update
);
router.delete(
  `${prefix}/articles/:articleId/comments/:commentId`,
  commentController.delete
);

export default router;
