import { Router } from 'express';
import { queryValidator, paramValidator } from '../validator/article';
import userController from '../controllers/user';
import articleController from '../controllers/article';

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
router.get('/articles', queryValidator, articleController.index);
router.get('/articles/:id', paramValidator, articleController.show);

export default router;
