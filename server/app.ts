import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
import envalid from './utils/envalid';
import token from './utils/token';
import morgan from './utils/morgan';

// Controllers (route handlers)
import userController from './controllers/user';
import articleController from './controllers/article';
import commentController from './controllers/comment';

// Load ronment variables from .file
const { isDebug, DB_URI, DB_NAME, API_PREFIX } = envalid();

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
app.use(morgan);

// Primary app routes
app.use(API_PREFIX, userController.router);
app.use(API_PREFIX, articleController.router);
app.use(API_PREFIX, commentController.router);

export default app;
