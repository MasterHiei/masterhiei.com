const faker = require('faker');
const co = require('co');
const Article = require('../../models/article/article');

/**
 * Get All Articles with desc
 * @param {Response} res
 * @returns {Void}
 */
exports.index = (_, res) => {
  co(function*() {
    const articles = yield findArticles();
    if (articles.length < 1) {
      yield generateArticles();
      const newArticles = yield findArticles();
      res.json({ code: 0, data: newArticles });
    } else {
      res.json({ code: 0, data: articles });
    }
  }).catch(err => {
    // TODO: Error handler
    console.error(err);
    res.sendStatus(500);
  });
};

/**
 * Get Article by id
 */
exports.show = async (req, res) => {
  const id = req.params.id;
  const article = await findArticlesById(id);
  if (article) {
    res.json({ code: 0, data: article });
  } else {
    res.sendStatus(404);
  }
};

/**
 * Find articles from DB
 * @returns {Promise<Array>} Articles
 */
const findArticles = () => {
  return Article.find()
    .sort('-created_by')
    .exec();
};

/**
 * Query article by id
 * @param {String} id MongoDB Document ID
 * @returns {Promise<Object>} Article
 */
const findArticlesById = id => {
  return Article.findById(id).exec();
};

/**
 * Generate dummy data of Article
 * @param {Number} times Number of data
 * @returns {Promise<Array>} Result of generation
 */
const generateArticles = (times = 12) => {
  let dummies = [];

  // generate dummy data N times
  for (let i = 0; i < times; i++) {
    const dummy = {
      title: faker.name.title(),
      content: faker.lorem.sentence(10).repeat(100),
      category: faker.name.jobType(),
      tags: faker.lorem.words(),
    };
    dummies.push(dummy);
  }
  return Article.insertMany(dummies);
};
