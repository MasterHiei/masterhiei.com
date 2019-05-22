import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import forEach from 'lodash/forEach';
import env from './utils/envalid';
import token from './utils/token';
import routes from './routes';

// Get environment variables
const { API_PREFIX } = env;

// Create Express server
const app = express();

// Express configuration
app.use(bodyParser.json());
app.use(token);
app.use(
  morgan('dev', {
    skip: (req): boolean => req.baseUrl !== env.API_PREFIX,
  })
);

// Primary app routes
forEach(
  routes,
  (route): void => {
    app.use(API_PREFIX, route);
  }
);

export default app;
