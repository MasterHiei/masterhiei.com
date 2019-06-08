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
  next: NextFunction
): void => {
  const status = err instanceof HttpException ? err.status : 500;
  const message = err.message || 'Unexpected error.';
  res.status(status).json({ error: { msg: message } });
};

export default errorHandler;
