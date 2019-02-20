const express = require('express');
const articlesController = require('./article/index');

const router = express.Router();

const baseUrl = '/api/v1';

// Articles Request
router.get(baseUrl + '/articles', articlesController.index);
router.get(baseUrl + '/article/:id', articlesController.show);

module.exports = router;
