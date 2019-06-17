import md5 from 'crypto-js/md5';

/**
 * Generate unique Gitalk id
 * @param articleId Article id
 */
const generateId = (articleId: string): string => {
  return md5(articleId).toString();
};

export { generateId };
