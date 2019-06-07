import mongoose from 'mongoose';
import consola from 'consola';
import { Nuxt, Builder } from 'nuxt';
import config from '../nuxt.config';
import app from './app';
import env from './utils/envalid';

// Get environment variables
const { isDev, DB_URI, DB_NAME, HOST, PORT } = env;

// Enable debugging if in development environment
mongoose.set('debug', isDev);

// Connect to MongoDB
mongoose.connect(DB_URI, {
  dbName: DB_NAME,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Listen for mongoose connection successful
mongoose.connection.on('connected', (): void => {
  require('./models/user');
  require('./models/article');
  consola.ready({
    message: 'MongoDB Connected',
    badge: true,
  });
});

// Listen for mongoose connection failed
mongoose.connection.on('error', (error): void => {
  consola.error({
    message: `MongoDB connection error: ${error}`,
    badge: true,
  });
});

// Start server with Nuxt.js
const start = async (): Promise<void> => {
  // Instantiate Nuxt.js with the configuration
  config.dev = isDev;
  const nuxt = new Nuxt(config);
  await nuxt.ready();

  // Render every route with Nuxt.js
  app.use(nuxt.render);

  // Build only in dev mode with hot-reloading
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // Listen the server
  app.listen(PORT, HOST, (): void =>
    consola.ready({
      message: `Server is listening on http://${HOST}:${PORT}`,
      badge: true,
    })
  );
};
start();
