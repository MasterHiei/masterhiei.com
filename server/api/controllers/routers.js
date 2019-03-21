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

// Article
router.get(`${prefix}/articles`, articlesController.index);
router.get(`${prefix}/articles/:id`, articlesController.show);

// Comment
router.post(`${prefix}/comments`, commentController.create);

module.exports = router;
