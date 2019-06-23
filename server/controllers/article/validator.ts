import { query, param } from 'express-validator';
import mongoose from 'mongoose';

/**
 * Validation for /articles/
 */
const index = [
  // Validate page and limit
  query(['page', 'limit'])
    .not()
    .isEmpty()
    .withMessage('Missing field.')
    .isInt()
    .withMessage('The field must be a number.')
    .toInt(),
];

/**
 * Validation for /articles/:id
 */
const show = [
  // Validate article id
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
