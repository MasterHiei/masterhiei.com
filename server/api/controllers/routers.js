const express = require('express');
const { app } = require(`../../env/${process.env.NODE_ENV}`);
const userController = require('./user/index');
const articlesController = require('./article/index');
const router = express.Router();

const prefix = app.api_prefix;

// User
router.post(`${prefix}/login`, userController.login);
router.post(`${prefix}/logout`, userController.logout);

// Article
router.get(`${prefix}/articles`, articlesController.index);
router.get(`${prefix}/articles/:id`, articlesController.show);

module.exports = router;
