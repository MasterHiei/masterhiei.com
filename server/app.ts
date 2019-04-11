import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
import env from './utils/envalid';
import token from './utils/token';
import routes from './routes';

// Obtain environment variables
const { isDebug, DB_URI, DB_NAME, API_PREFIX } = env;

// Create Express server
const app = express();

// Connect to MongoDB
if (isDebug) {
  mongoose.set('debug', isDebug);
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
    }
  )
  .catch(
    (error: Error): void => {
      console.log(`MongoDB connection error: ${error}`);
    }
  );

// Express configuration
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
// app.use(cookieParser);
app.use(token);
app.use(
  morgan('dev', {
    skip: (req): boolean => req.path.indexOf(env.API_PREFIX) < 0,
  })
);

// Primary app routes
app.use(API_PREFIX, routes);

export default app;
