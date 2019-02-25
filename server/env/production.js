const app = {
  protocol: 'http',
  host: '127.0.0.1',
  port: 3001,
  api_prefix: '/api/v1',
};

const database = {
  url: 'mongodb://127.0.0.1:27017/my_blog_api_development',
  options: {
    useNewUrlParser: true,
    useCreateIndex: true,
  },
};

module.exports = { app, database };
