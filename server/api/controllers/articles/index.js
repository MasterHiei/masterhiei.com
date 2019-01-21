const Article = require('../../models/article/article')

/**
 * Get All Articles with desc
 * @returns All Articles with desc
 */
exports.index = (_, res) => {
  Article.find()
  .sort({ createdBy: 'desc' })
  .exec()
  .then((articles) => {
    // Success
    res.json({
      code: 0,
      data: articles
    })
  })
  .catch((err) => {
    // TODO: Error handler
    res.sendStatus(404)
  })
}
