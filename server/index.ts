import App from './app';
import { Controller } from './api/controllers/index';
import UserController from './api/controllers/user/index';
import ArticleController from './api/controllers/article/index';
import CommentController from './api/controllers/comment/index';

const controllers: Controller[] = [
  new UserController(),
  new ArticleController(),
  new CommentController(),
];
const app = new App(controllers);
app.start();
