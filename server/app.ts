import path from 'path';
import consola from 'consola';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import env from './utils/envalid';
import token from './utils/token';
import routes from './routes';

// Obtain environment variables
const { isDev, DB_URI, DB_NAME, API_PREFIX } = env;

// Create Express server
const app = express();

// Connect to MongoDB
if (isDev) {
  mongoose.set('debug', isDev);
}
mongoose
  .connect(DB_URI, {
    dbName: DB_NAME,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(
    (): void => {
      require('./models/user');
      require('./models/article');
      require('./models/comment');
      consola.ready({
        message: 'Connected to MongoDB',
        badge: true,
      });
    }
  )
  .catch(
    (error: Error): void => {
      consola.error({
        message: `MongoDB connection error: ${error}`,
        badge: true,
      });
    }
  );

// Express configuration
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(token);
app.use(
  morgan('dev', {
    skip: (req): boolean => req.path.indexOf(env.API_PREFIX) < 0,
  })
);

// Primary app routes
app.use(API_PREFIX, routes);

export default app;
