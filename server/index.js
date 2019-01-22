const express = require('express')
const mongoose = require('mongoose')
const consola = require('consola')
const morgan = require('morgan')
const api = require('./api/index')
const db = require('./api/models/db')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3001

app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Give routing to express
app.use(api)

// Start Nuxt.js
async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Give Morgan middleware to express
  app.use(morgan('dev'))

  // Listen the server
  app.listen(port, host, () => {
    // Print console log
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })

    // Connect mongodb
    mongoose.connect(db.url, db.options)
    .then(
      () => consola.ready({
        message: `Mongoose connected to ${db.url}`,
        badge: true
      }),
      (error) => consola.error({
        message: `Mongoose connection error: ${error}`,
        badge: true
      })
    )
  })
}
start()
