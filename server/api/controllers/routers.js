const express = require('express');
const userController = require('./user/index');
const articlesController = require('./article/index');
const commentController = require('./comment/index');
const router = express.Router();

const prefix = process.env.API_PREFIX;

// User
router.post(`${prefix}/login`, userController.login);
router.post(`${prefix}/logout`, userController.logout);
router.get(`${prefix}/users/me`, userController.me);
router.put(`${prefix}/users/validate`, userController.validate);
router.post(`${prefix}/users`, userController.create);
router.post(`${prefix}/users/social`, userController.fetchSocial);

// Article
router.get(`${prefix}/articles`, articlesController.index);
router.get(`${prefix}/articles/:id`, articlesController.show);

// Comment
router.post(`${prefix}/articles/:articleId/comments`, commentController.create);
router.patch(
  `${prefix}/articles/:articleId/comments/:commentId`,
  commentController.update
);
router.delete(
  `${prefix}/articles/:articleId/comments/:commentId`,
  commentController.delete
);

module.exports = router;
