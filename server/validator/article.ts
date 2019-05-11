import { query, param } from 'express-validator/check';
import { sanitizeQuery } from 'express-validator/filter';
import mongoose from 'mongoose';

/**
 * Validator for queries
 */
const queryValidator = [
  // Page
  query('page')
    .not()
    .isEmpty()
    .withMessage('Missing field.')
    .isInt()
    .withMessage('The field must be a number.'),

  // Limit
  query('limit')
    .not()
    .isEmpty()
    .withMessage('Missing field.')
    .isInt()
    .withMessage('The field must be a number.'),

  // Sanitization
  sanitizeQuery('page').toInt(),
  sanitizeQuery('limit').toInt(),
];

/**
 * Validator for params
 */
const paramValidator = [
  // ID
  param('id').custom(
    (value: any): Promise<any> => {
      // Check param is a mongoose ObjectId
      const isValid = mongoose.Types.ObjectId.isValid(value);
      if (!isValid) {
        return Promise.reject(new Error('Invalid value.'));
      }
      return Promise.resolve(value);
    }
  ),
];

export { queryValidator, paramValidator };
