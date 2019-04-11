import { Request, Response, NextFunction } from 'express-serve-static-core';

const extraToken = (req: Request, _: Response, next: NextFunction): void => {
  const authorization = req.headers.authorization;
  if (authorization && authorization.split(' ').length === 2) {
    const token = authorization.split(' ')[1];
    req.token = token;
  }
  next();
};

export default extraToken;
