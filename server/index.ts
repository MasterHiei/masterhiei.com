import App from './app';
import { Controller } from './controllers/interface';
import UserController from './controllers/user';
import ArticleController from './controllers/article';
import CommentController from './controllers/comment';

const controllers: Controller[] = [
  new UserController(),
  new ArticleController(),
  new CommentController(),
];
const app = new App(controllers);
app.start();
