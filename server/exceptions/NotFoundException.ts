import { Types } from 'mongoose';
import HttpException from './HttpException';

/**
 * 404 Not Found
 */
class NotFoundException extends HttpException {
  // Constructor function
  public constructor(id: Types.ObjectId) {
    super(404, {
      error: {
        param: 'id',
        value: id,
        msg: 'Data does not exist.',
      },
    });
  }
}

export default NotFoundException;
