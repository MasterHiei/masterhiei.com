import { query, param } from 'express-validator/check';
import { sanitizeQuery } from 'express-validator/filter';
import mongoose from 'mongoose';

/**
 * Validation for page and limit
 */
const index = [
  query(['page', 'limit'])
    .not()
    .isEmpty()
    .withMessage('Missing field.')
    .isInt()
    .withMessage('The field must be a number.'),

  // Sanitization
  sanitizeQuery(['page', 'limit']).toInt(),
];

/**
 * Validation for id
 */
const show = [
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

export default { index, show };
