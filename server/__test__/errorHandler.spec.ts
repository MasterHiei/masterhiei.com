import mongoose from 'mongoose';
import errorHandler from '../middleware/errorHandler';
import InternalServerException from '../exceptions/InternalServerException';
import NotFoundException from '../exceptions/NotFoundException';

/**
 * Generate mock response
 */
const mockResponse = (): any => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// Error handling middleware tests
describe('Testing Express Error Handling Middleware', (): void => {
  // Internal server error
  describe('500 Internal Server Error', (): void => {
    it('Return status 500 with error message', (): void => {
      const req = jest.fn() as any;
      const res = mockResponse();
      const next = jest.fn();

      // Unexpected error
      errorHandler(new Error(), req, res, next);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: { msg: 'Unexpected error.' },
      });

      // InternalServerException
      const err = new InternalServerException('Test error message.');
      errorHandler(err, req, res, next);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: { msg: 'Test error message.' },
      });
    });
  });

  // Not Found
  describe('404 Not Found', (): void => {
    it('Return status 404 with error message and parameter id', (): void => {
      const req = jest.fn() as any;
      const res = mockResponse();
      const next = jest.fn();
      const id = mongoose.Types.ObjectId();
      const err = new NotFoundException(id);
      errorHandler(err, req, res, next);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: {
          param: 'id',
          value: id,
          msg: 'Data does not exist.',
        },
      });
    });
  });
});
