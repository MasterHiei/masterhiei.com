const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { Nuxt, Builder } = require('nuxt');
const config = require('../nuxt.config.ts');
const api = require('./api/index');
const app = express();
const isDebug = !(process.env.NODE_ENV === 'production');

// Extra and set token to request
app.use((req, _, next) => {
  const authorization = req.headers.authorization;
  if (authorization && authorization.split(' ').length === 2) {
    const token = authorization.split(' ')[1];
    req.token = token;
  }
  next();
});

// Connect to mongodb
mongoose.set('debug', isDebug);
mongoose.connect(process.env.DB_URI, {
  dbName: process.env.DB_NAME,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
require('./api/models/user/user');
require('./api/models/article/article');
require('./api/models/comment/comment');

// Set public resources path
app.use('/public', express.static(path.join(__dirname, '/public')));

// Morgan middleware
app.use(
  morgan('dev', {
    skip: req => req.path.indexOf(process.env.API_PREFIX) < 0,
  })
);

// cookie-parser middleware
app.use(cookieParser());

// body-parser middleware
app.use(bodyParser.json());

// Routing middleware
app.use(api);

// Import and Set Nuxt.js options
config.dev = isDebug;

// Start Nuxt.js
async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);
  await nuxt.ready();

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(process.env.PORT, process.env.HOST);
}
start();
