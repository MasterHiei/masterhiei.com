import { Router } from 'express';
import article from '../controllers/article/route';
import tag from '../controllers/tag/route';
import userController from '../controllers/user';

// Experss app router
const router = Router();

// Routes of User
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/users/me', userController.me);
router.put('/users/validate', userController.validate);
router.post('/users', userController.create);
router.post('/users/social', userController.fetchSocial);

export default [router, article, tag];
