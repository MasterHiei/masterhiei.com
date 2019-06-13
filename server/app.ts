import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import env from './utils/envalid';
import routes from './routes';
import errorHandler from './middleware/errorHandler';

// Get environment variables
const { API_PREFIX } = env;

// Create Express server
const app = express();

// Express middleware configuration
app.use(bodyParser.json());
app.use(
  morgan('dev', {
    skip: (req): boolean => req.baseUrl !== env.API_PREFIX,
  })
);

// Primary app routes
routes.forEach((route): void => {
  app.use(API_PREFIX, route);
});

// Error handler
app.use(errorHandler);

export default app;
