import { query } from 'express-validator/check';
import { sanitizeQuery, sanitizeParam } from 'express-validator/filter';

/**
 * Validation for page, limit
 */
const show = [
  query(['page', 'limit'])
    .not()
    .isEmpty()
    .withMessage('Missing field.')
    .isInt()
    .withMessage('The field must be a number.'),

  // Sanitization
  sanitizeQuery(['page', 'limit']).toInt(),
  sanitizeParam('tag').trim(),
];

export default { show };
