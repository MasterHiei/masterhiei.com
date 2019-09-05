import { Server } from 'http';
import request, { SuperTest, Test } from 'supertest';
import mongoose from 'mongoose';
import dropRight from 'lodash/dropRight';
import sortBy from 'lodash/sortBy';
import ArticleModel, { Article } from '../models/article';
import mongoDB from './utils/mongoDB';
import mocksGenerator from './__mocks__/article';
import app from '..';

// Base url
const url = '/articles';

// Get environment variables

// Instance of test server, request and data
let server: Server, agent: SuperTest<Test>;

// Create a test server and connect to db before all tests start
beforeAll((done): void => {
  server = app.listen(4000);
  agent = request(server);
  mongoDB.connect(done);
});

// Disconnect db and close server after all tests done
afterAll((done): void => {
  mongoDB.disconnect(server, done);
});

// Routing tests
describe('Testing Article Routing', (): void => {
  // Get articles with query params
  describe('Get /articles', (): void => {
    // Successful request
    describe('Success', (): void => {
      // Mock data
      let mocks: Article[];

      // Insert mock data to database
      beforeEach(
        async (done): Promise<void> => {
          mocks = await ArticleModel.insertMany(mocksGenerator());
          done();
        }
      );

      // Remove mock data in database
      afterEach((done): void => {
        ArticleModel.deleteMany({}, done);
      });

      // Test
      it('Returns status 200 with an article list', async (): Promise<void> => {
        const response = await agent
          .get(url)
          .query({ page: 1, limit: mocks.length - 1 });

        // Test status code
        expect(response.status).toBe(200);

        // Test article list
        const descendant = sortBy(mocks, ['created_at', '_id']).reverse();
        const expected = dropRight(descendant);
        const articles = response.body.articles;
        expect(JSON.stringify(articles)).toEqual(JSON.stringify(expected));
      });
    });

    // Missing all params
    describe('Failure: Missing all params', (): void => {
      it('Returns status 422', async (): Promise<void> => {
        const response = await agent.get(url);
        expect(response.status).toBe(422);
      });
    });

    // Missing page
    describe('Failure: Missing page', (): void => {
      it('Returns status 422', async (): Promise<void> => {
        const response = await agent.get(url).query({ limit: 4 });
        expect(response.status).toBe(422);
      });
    });

    // Missing limit
    describe('Failure: Missing limit', (): void => {
      it('Returns status 422', async (): Promise<void> => {
        const response = await agent.get(url).query({ page: 1 });
        expect(response.status).toBe(422);
      });
    });

    // Incorrect page type
    describe('Failure: Incorrect page type', (): void => {
      it('Returns status 422', async (): Promise<void> => {
        const response = await agent.get(url).query({ page: 'a' });
        expect(response.status).toBe(422);
      });
    });

    // Incorrect limit type
    describe('Failure: Incorrect limit type', (): void => {
      it('Returns status 422', async (): Promise<void> => {
        const response = await agent.get(url).query({ limit: 'b' });
        expect(response.status).toBe(422);
      });
    });
  });

  // Get an article with id
  describe('Get /articles/:id', (): void => {
    // Successful request
    describe('Success', (): void => {
      let mock: Article;

      // Insert mock data to database
      beforeAll(
        async (done): Promise<void> => {
          const mocks = await ArticleModel.insertMany(mocksGenerator());
          mock = mocks[0];
          done();
        }
      );

      // Remove mocking data in database
      afterAll((done): void => {
        ArticleModel.deleteMany({}, done);
      });

      // Test
      it('Returns status 200 with an article object', async (): Promise<
        void
      > => {
        const response = await agent.get(`${url}/${mock._id}`);
        expect(response.status).toBe(200);

        mock.views += 1;
        const article = response.body.article;
        expect(JSON.stringify(article)).toEqual(JSON.stringify(mock));
      });
    });

    // Incorrect id type
    describe('Failure: Incorrect id type', (): void => {
      it('Returns status 422', async (): Promise<void> => {
        const response = await agent.get(`${url}/id`);
        expect(response.status).toBe(422);
      });
    });

    // No result
    describe('Failure: No result', (): void => {
      it('Returns status 404', async (): Promise<void> => {
        const id = mongoose.Types.ObjectId();
        const response = await agent.get(`${url}/${id}`);
        expect(response.status).toBe(404);
      });
    });
  });
});
