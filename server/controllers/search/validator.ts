import { query } from 'express-validator';

/**
 * Validation for /search
 */
const index = [
  // Validate keywords
  query('keywords')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Missing field.')
    .isString()
    .withMessage('The field must be a string.'),
];

export default { index };
