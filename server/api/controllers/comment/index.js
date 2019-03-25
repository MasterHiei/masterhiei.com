const Comment = require('../../models/comment/comment.js');
const Article = require('../../models/article/article');

/**
 * Create a new Comment
 * @param {Request} req
 * @param {Response} res
 */
exports.create = async (req, res) => {
  const { userId, articleId, content } = req.body;
  if (!userId || !articleId || !content) {
    res.status(401).send({ message: 'Invalid POST parameters.' });
    return;
  }

  // Save comment and create data relationship
  const comment = new Comment({
    user: userId,
    article: articleId,
    content: content,
  });
  const newComment = await comment.save().catch(error => {
    console.log(error);
    res.status(500).send({ message: 'Unexcepted Error.' });
  });
  await Article.where({ _id: articleId })
    .update({ $push: { comments: newComment._id } })
    .exec()
    .catch(error => {
      console.log(error);
      res.status(500).send({ message: 'Unexcepted Error.' });
    });
  res.json({ code: 0 });
};
