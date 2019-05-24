import { sanitizeParam } from 'express-validator/filter';

/**
 * Validate for params
 */
const params = [
  // Sanitization
  sanitizeParam('tag').trim(),
];

export default { params };
