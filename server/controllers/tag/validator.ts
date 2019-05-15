import { param } from 'express-validator/check';

/**
 * Validate for params
 */
const params = [
  // ID
  param('tag')
    .not()
    .isEmpty()
    .withMessage('Missing field.')
    .isString()
    .withMessage('The field must be a string.')
    .trim(),
];

export default { params };
