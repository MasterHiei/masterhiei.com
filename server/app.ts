import path from 'path';
import express, { Application } from 'express';
import consola from 'consola';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { Nuxt, Builder } from 'nuxt';
import config from '../nuxt.config';
import envalid, { Env } from './utils/envalid';
import token from './utils/token';
import morgan from './utils/morgan';
import { Controller } from './api/controllers';

class App {
  public app: Application;

  private env: Env;
  private port: number;
  private hostname: string;

  public constructor(controllers: Controller[]) {
    this.app = express();
    this.env = envalid();
    this.port = this.env.PORT;
    this.hostname = this.env.HOST;

    this.connectToDatabase();
    this.initializeMiddleware();
    this.initializeControllers(controllers);
  }

  private connectToDatabase(): void {
    const { isDebug, DB_URI, DB_NAME } = this.env;
    mongoose.set('debug', isDebug);
    mongoose.connect(DB_URI, {
      dbName: DB_NAME,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    require('./api/models/user/user');
    require('./api/models/article/article');
    require('./api/models/comment/comment');
  }

  private initializeMiddleware(): void {
    this.app.use('/public', express.static(path.join(__dirname, 'public')));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser);
    this.app.use(token);
    this.app.use(morgan);
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach(
      (controller): void => {
        this.app.use(this.env.API_PREFIX, controller.router);
      }
    );
  }

  private listen(): void {
    this.app.listen(
      this.port,
      this.hostname,
      (): void => {
        consola.ready({
          message: `Server is listening on http://${this.hostname}:${
            this.port
          }`,
          badge: true,
        });
      }
    );
  }

  /**
   * Start with Nuxt.js
   */
  public async start(): Promise<void> {
    // Instantiate Nuxt.js with the configuration
    config.dev = this.env.isDev;
    const nuxt = new Nuxt(config);
    await nuxt.ready();

    // Render every route with Nuxt.js
    this.app.use(nuxt.render);

    // Build only in dev mode with hot-reloading
    if (config.dev) {
      const builder = new Builder(nuxt);
      await builder.build();
    }

    // Listen the server
    this.listen();
  }
}

export default App;
