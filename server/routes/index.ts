import { Router } from 'express';
import userController from '../controllers/user';
import articleController from '../controllers/article';
import commentController from '../controllers/comment';

// Experss app router
const router = Router();

// Routes of User
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/users/me', userController.me);
router.put('/users/validate', userController.validate);
router.post('/users', userController.create);
router.post('/users/social', userController.fetchSocial);

// Routes of Article
router.get('/articles', articleController.index);
router.get('/articles/:id', articleController.show);

// Routes of Comment
router.post('/articles/:articleId/comments', commentController.create);
router.patch(
  '/articles/:articleId/comments/:commentId',
  commentController.update
);
router.delete(
  '/articles/:articleId/comments/:commentId',
  commentController.remove
);

export default router;
