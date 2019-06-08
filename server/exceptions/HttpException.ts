/**
 * Http Error
 */
class HttpException extends Error {
  // Properties declaration
  public status: number;
  public message: string;

  // Constructor function
  public constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default HttpException;
