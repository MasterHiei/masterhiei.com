const Comment = require('../../models/comment/comment.js');

/**
 * Create a new Comment
 * @param {Request} req
 * @param {Response} res
 */
exports.new = (req, res) => {
  const comment = new Comment({});
  console.log(comment);
};
