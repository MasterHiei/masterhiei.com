const express = require('express');
const mongoose = require('mongoose');
const consola = require('consola');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const env = require(`./env/${process.env.NODE_ENV}`);
const api = require('./api/index');
const { Nuxt, Builder } = require('nuxt');
const app = express();

// Share Env to server side
app.use((_, res, next) => {
  res.locals.app = {
    domain: env.app.domain,
  };
  next();
});

// Set public resources path
app.use('/static', express.static(__dirname + '/public'));

// Morgan middleware
app.use(
  morgan('dev', {
    skip: req => req.path.indexOf(env.app.api_prefix) < 0,
  })
);

// cookie-parser middleware
app.use(cookieParser());

// body-parser middleware
app.use(bodyParser.json());

// Routing middleware
app.use(api);

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js');
config.dev = !(process.env.NODE_ENV === 'production');

// Start Nuxt.js
async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(env.app.port, env.app.host, () => {
    consola.ready({
      message: `Server listening on ${env.app.domain}`,
      badge: true,
    });

    // Connect mongodb
    mongoose.set('debug', true);
    mongoose.connect(env.database.uri, env.database.options).then(
      () =>
        consola.ready({
          message: `Mongoose connected to ${env.database.url}`,
          badge: true,
        }),
      error =>
        consola.error({
          message: `${error}`,
          badge: true,
        })
    );
  });
}
start();
