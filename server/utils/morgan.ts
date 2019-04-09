import { RequestHandler } from 'express';
import morgan from 'morgan';

const morganHandler = (prefix: string): RequestHandler =>
  morgan('dev', {
    skip: (req): boolean => req.path.indexOf(prefix) < 0,
  });

export default morganHandler;
