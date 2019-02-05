const faker = require('faker')
const co = require('co')
const Article = require('../../models/article/article')

/**
 * Get All Articles with desc
 * @param {Response} res
 * @returns {Void} All Articles with desc
 */
exports.index = (_, res) => {
  co(function*() {
    const articles = yield findArticles()
    if (articles.length < 1) {
      yield generateArticles()
      const newArticles = yield findArticles()
      res.json({ code: 0, data: newArticles })
    } else {
      res.json({ code: 0, data: articles })
    }
  }).catch(err => {
    // TODO: Error handler
    console.error(err)
    res.sendStatus(500)
  })
}

/**
 * Find articles from DB
 * @returns {Promise<Array>} Articles
 */
const findArticles = () => {
  return Article.find()
    .in('isDeleted', false)
    .sort({ createdBy: 'desc' })
    .exec()
}

/**
 * Generate dummy data of Article
 * @param {Number} times Number of data
 * @returns {Promise<Array>} Result of generation
 */
const generateArticles = (times = 12) => {
  let dummies = []

  // generate dummy data N times
  for (let i = 0; i < times; i++) {
    const dummy = {
      title: faker.name.title(),
      body: faker.lorem.sentence(10).repeat(100),
      type: faker.name.jobType(),
      tags: faker.lorem.words(),
      stars: faker.random.number({ min: 0, max: 200 }),
      createdBy: faker.name.findName(),
    }
    dummies.push(dummy)
  }
  return Article.insertMany(dummies)
}
