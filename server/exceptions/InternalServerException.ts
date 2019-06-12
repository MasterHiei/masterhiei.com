import HttpException from './HttpException';

/**
 * 500 Internal Server Error
 */
class InternalServerException extends HttpException {
  // Constructor function
  public constructor(message: string) {
    super(500, { error: { msg: message } });
  }
}

export default InternalServerException;
