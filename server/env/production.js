const app = {
  domain: 'https://www.masterhiei.com',
  protocol: 'http',
  host: '127.0.0.1',
  port: 3001,
  api_prefix: '/api/v1',
};

const database = {
  url: 'mongodb://127.0.0.1:27017',
  options: {
    dbName: 'my_blog_api_development',
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
};

const auth = {
  secret: 'masterhieiieihretsam',
  expiresIn: '30d',
};

const github = {
  client_id: '0c46e1c41451ff4c3116',
  client_secret: 'e8a7f69952a9049096cd9f10ba9a1c3428e866bf',
};

const crypto = {
  saltRound: 12,
};

module.exports = { app, database, auth, github, crypto };
