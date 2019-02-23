const port = 3001;

const app = {
  baseUrl: `http://127.0.0.1:${port}`,
  port: port,
  apiUrl: '/api/v1',
};

const database = {
  url: 'mongodb://127.0.0.1:27017/my_blog_api_development',
  options: {
    useNewUrlParser: true,
  },
};

module.exports = { app, database };
