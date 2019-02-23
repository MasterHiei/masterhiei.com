const express = require('express');
const articlesController = require('./article/index');
const router = express.Router();
const { app } = require(`../../env/${process.env.NODE_ENV}`);

const apiUrl = app.apiUrl;

// Articles Request
router.get(apiUrl + '/articles', articlesController.index);
router.get(apiUrl + '/articles/:id', articlesController.show);

module.exports = router;
