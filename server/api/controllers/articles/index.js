const faker = require('faker')
const Article = require('../../models/article/article')

/**
 * Get All Articles with desc
 * @param {Response} res
 * @returns All Articles with desc
 */
exports.index = (_, res) => {
  Article
  .find()
  .in('isDeleted', false)
  .sort({ createdBy: 'desc' })
  .exec()
  .then(articles => {
    // generate dummy data if docs is empty
    if (articles.length < 1) generateArticles()
    // TODO: return the newly generated data
    res.json({ code: 0, data: articles })
  })
  .catch(err => {
    // TODO: Error handler
    console.error(err)
    res.sendStatus(404)
  })
}

/**
 * Generate dummy data of Article
 * @param {Number} times Number of data
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
      stars: faker.random.number({ min: 0, max: 200}),
      createdBy: faker.name.findName()
    }
    dummies.push(dummy)
  }
  Article.insertMany(dummies, err => console.error(err))
}
