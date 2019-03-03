const express = require('express');
const { app } = require(`../../env/${process.env.NODE_ENV}`);
const userController = require('./user/index');
const articlesController = require('./article/index');
const router = express.Router();

const prefix = app.api_prefix;

// User
router.post(`${prefix}/login`, userController.login);
router.post(`${prefix}/logout`, userController.logout);
router.get(`${prefix}/users`, userController.show);
router.put(`${prefix}/users/validate`, userController.validate);
router.post(`${prefix}/users`, userController.create);

// Article
router.get(`${prefix}/articles`, articlesController.index);
router.get(`${prefix}/articles/:id`, articlesController.show);

module.exports = router;
