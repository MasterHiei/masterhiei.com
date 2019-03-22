const Comment = require('../../models/comment/comment.js');

/**
 * Create a new Comment
 * @param {Request} req
 * @param {Response} res
 */
exports.create = (req, res) => {
  const { userId, articleId, content } = req.body;
  if (!userId || !articleId || !content) {
    res.status(401).send({ message: 'Invalid POST parameters.' });
    return;
  }

  const comment = new Comment({
    user: userId,
    article: articleId,
    content: content,
  });
  comment.save(err => {
    if (err) {
      res.json({ code: 500, message: 'Unexcepted Error.' });
    } else {
      res.json({ code: 0 });
    }
  });
};
