import consola from 'consola';
import { Nuxt, Builder } from 'nuxt';
import config from '../nuxt.config';
import app from './app';
import env from './utils/envalid';

// Get environment variables
const { isDev, HOST, PORT } = env;

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
  app.listen(
    PORT,
    HOST,
    (): void =>
      consola.ready({
        message: `Server is listening on http://${HOST}:${PORT}`,
        badge: true,
      })
  );
};
start();
