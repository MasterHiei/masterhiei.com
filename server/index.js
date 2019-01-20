const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3001

// Import mongodb
const mongoose = require('mongoose')
const db = require('./api/models/db')

app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

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
        message: 'Mongoose: connected',
        badge: true
      }),
      (error) => consola.error({
        message: `Mongoose: connection error: ${error}`,
        badge: true
      })
    )
  })
}
start()
