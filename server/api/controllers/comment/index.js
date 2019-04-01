const Comment = require('../../models/comment/comment.js');
const Article = require('../../models/article/article');

// TODO: Add permission check
/**
 * Create a new Comment
 * @param {Request} req
 * @param {Response} res
 */
exports.create = async (req, res) => {
  const articleId = req.params.articleId;
  const { userId, content } = req.body;
  if (!userId || !articleId || !content) {
    res.status(400).send({ message: 'Invalid POST parameters.' });
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

/**
 * Update a Comment
 * @param {Request} req
 * @param {Response} res
 */
exports.update = async (req, res) => {
  const commentId = req.params.commentId;
  const { content } = req.body;
  if (!commentId || !content) {
    res.status(400).send({ message: 'Invalid POST parameters.' });
    return;
  }

  await Comment.where({ _id: commentId })
    .update({ $set: { content: content } })
    .exec()
    .catch(error => {
      console.log(error);
      res.status(500).send({ message: 'Unexcepted Error.' });
    });
  res.json({ code: 0 });
};

/**
 * Delete a Comment
 * @param {Request} req
 * @param {Response} res
 */
exports.delete = async (req, res) => {
  const commentId = req.params.commentId;
  if (!commentId) {
    res.status(400).send({ message: 'Invalid comment id.' });
    return;
  }

  await Comment.deleteOne({ _id: commentId })
    .exec()
    .catch(error => {
      console.log(error);
      res.status(500).send({ message: 'Unexcepted Error.' });
    });
  res.json({ code: 0 });
};
