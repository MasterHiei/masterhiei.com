const express = require('express')
const articlesController = require('./articles/index')

const router = express.Router()

const baseUrl = '/api/v1'

// Articles Request
router.get(baseUrl + '/articles', articlesController.index)

module.exports = router
