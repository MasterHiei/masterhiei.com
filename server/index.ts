import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import env from './utils/envalid';
import mongoDB from './utils/mongoDB';
import routes from './routes';
import errorHandler from './middleware/errorHandler';

// Start mongoDB service
mongoDB.start();

// Get environment variables
const { API_PREFIX } = env;

// Create Express server
const app = express();

// Express middleware configuration
app.use(bodyParser.json());
app.use(
  morgan('dev', {
    skip: (req): boolean => req.baseUrl !== API_PREFIX,
  })
);

// Primary app routes
app.use(routes);

// Error handler
app.use(errorHandler);

export default app;
