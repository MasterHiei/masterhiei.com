import { query } from 'express-validator/check';
import { sanitizeQuery } from 'express-validator/filter';

/**
 * Validate queries in request
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

export { queryValidator };
