import { query } from 'express-validator/check';
import { sanitizeQuery, sanitizeParam } from 'express-validator/filter';

/**
 * Validate for queries
 */
const queries = [
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
 * Validate for params
 */
const params = [
  // Sanitization
  sanitizeParam('tag').trim(),
];

export default { queries, params };
