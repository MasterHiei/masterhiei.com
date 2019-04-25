import sanitizeHtml from 'sanitize-html';

const sanitizer = (dirty: string): string => {
  return sanitizeHtml(dirty, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2']),
  });
};

export default sanitizer;
