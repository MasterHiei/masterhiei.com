import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';

/**
 * Handle Express exceptions
 * @param error Error
 * @param _ Request
 * @param res Response
 * @param next NextFunction
 */
const errorHandler = (
  err: HttpException | Error,
  _: Request,
  res: Response,
  __: NextFunction
): void => {
  if (err instanceof HttpException) {
    res.status(err.status).json(err.message);
  } else {
    res.status(500).json({ error: { msg: 'Unexpected error.' } });
  }
};

export default errorHandler;
