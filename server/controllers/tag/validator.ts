import { query, param } from 'express-validator';

/**
 * Validation for /tags/:tag
 */
const show = [
  // Validate page and limit
  query(['page', 'limit'])
    .not()
    .isEmpty()
    .withMessage('Missing field.')
    .isInt()
    .withMessage('The field must be a number.')
    .toInt(),

  // Validate tag
  param('tag')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Missing field.')
    .isString()
    .withMessage('The field must be a string.'),
];

export default { show };
