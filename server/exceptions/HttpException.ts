/**
 * Http Error
 */
class HttpException extends Error {
  // Properties declaration
  public status: number;
  public message: any;

  // Constructor function
  public constructor(status: number, message: any) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default HttpException;
