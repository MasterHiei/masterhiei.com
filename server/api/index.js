const express = require('express')
const routers = require('./controllers/routers')

const router = express.Router()

// Apply routers
router.use(routers)

module.exports = router
