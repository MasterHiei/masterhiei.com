import md5 from 'crypto-js/md5';

/**
 * Generate unique id
 * @param articleId Article id
 */
const hashedId = (articleId: string): string => {
  return md5(articleId).toString();
};

export { hashedId };
