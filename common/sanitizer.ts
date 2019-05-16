import sanitizeHtml from 'sanitize-html';

/**
 * Sanitize HTML string
 * @param dirty Unsanitized HTML string
 */
const sanitizeHTML = (dirty: string): string => {
  return sanitizeHtml(dirty, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2']),
  });
};

export default sanitizeHTML;
