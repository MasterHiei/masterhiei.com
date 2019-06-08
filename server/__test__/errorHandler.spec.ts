import errorHandler from '../middleware/errorHandler';
import InternalServerError from '../exceptions/InternalServerError';

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

      // InternalServerError
      const err = new InternalServerError('Test error message.');
      errorHandler(err, req, res, next);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: { msg: 'Test error message.' },
      });
    });
  });
});
