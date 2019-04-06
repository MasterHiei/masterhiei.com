const faker = require('faker');
const co = require('co');
const Article = require('../../models/article/article');

/**
 * Find articles from DB
 * @returns {Promise<Array>} Articles
 */
const findArticles = () => {
  return Article.find()
    .populate({
      path: 'comments',
      select: 'content created_at updated_at',
      options: {
        sort: 'created_at',
      },
      populate: {
        path: 'user',
        select: 'username avatar',
      },
    })
    .sort('-created_at')
    .exec();
};

/**
 * Generate dummy data of Article
 * @param {Number} times Number of data
 * @returns {Promise<Array>} Result of generation
 */
const generateArticles = (times = 12) => {
  const dummies = [];

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

/**
 * Get All Articles with desc
 * @param {Response} res
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
  }).catch(error => {
    // TODO: Error handler
    console.error(error);
    res.sendStatus(500);
  });
};

/**
 * Get Article by id
 * @param {Request} req
 * @param {Response} res
 */
exports.show = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({ message: 'Invalid article id.' });
  }

  const article = await Article.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true }
  )
    .populate({
      path: 'comments',
      select: 'content created_at updated_at',
      options: {
        sort: 'created_at',
      },
      populate: {
        path: 'user',
        select: 'username avatar',
      },
    })
    .exec()
    .catch(error => {
      console.log(error);
      res.status(500).send({ message: 'Unexcepted Error.' });
    });
  if (article) {
    res.json({ code: 0, data: article });
  } else {
    res.status(404).send({ message: 'Article data does not exist.' });
  }
};
