import HttpException from './HttpException';

/**
 * 500 Internal Server Error
 */
class InternalServerError extends HttpException {
  // Constructor function
  public constructor(message: string) {
    super(500, message);
  }
}

export default InternalServerError;
