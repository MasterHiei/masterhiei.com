import { Server } from 'http';
import request, { SuperTest, Test } from 'supertest';
import mongoose, { Schema } from 'mongoose';
import forEach from 'lodash/forEach';
import app from '../app';
import ArticleModel, { ArticleInput } from '../models/article';
import mockGenerator from './mock/article';

// Base url
const url = '/api/v1/articles';

// Get environment variables

// Instance of test server, request and data
let server: Server, agent: SuperTest<Test>;

// Before all tests
beforeAll(
  (done): void => {
    // Create a test server
    server = app.listen(4000);
    agent = request(server);
    mongoose
      .connect('mongodb://127.0.0.1:27017', {
        dbName: 'test_masterhiei_db',
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then((): void => done());
  }
);

// Close test server
afterAll(
  (done): void => {
    mongoose.disconnect().then(
      (): void => {
        server.close(done);
      }
    );
  }
);

// Routing tests
describe('Testing Article Routing', (): void => {
  // Get articles with query params
  describe('Get /articles', (): void => {
    // Successful request
    describe('Success', (): void => {
      // Mock data
      let mocks: ArticleInput[];

      // Insert mock data to database
      beforeEach(
        (done): void => {
          mocks = mockGenerator();
          ArticleModel.insertMany(mocks, done);
        }
      );

      // Remove mock data in database
      afterEach(
        (done): void => {
          ArticleModel.deleteMany({}, done);
        }
      );

      // Test
      it('Return status 200 with a article list', async (): Promise<void> => {
        const response = await agent
          .get(url)
          .query({ page: 1, limit: mocks.length });
        expect(response.status).toBe(200);
        expect(response.body.articles.length).toBe(mocks.length);
        forEach(
          mocks,
          (mock): void =>
            expect(response.body.articles).toEqual(
              expect.arrayContaining([expect.objectContaining(mock)])
            )
        );
      });
    });

    // Missing all params
    describe('Failure: Missing all params', (): void => {
      it('Return status 422', async (): Promise<void> => {
        const response = await agent.get(url);
        expect(response.status).toBe(422);
      });
    });

    // Missing page
    describe('Failure: Missing page', (): void => {
      it('Return status 422', async (): Promise<void> => {
        const response = await agent.get(url).query({ limit: 4 });
        expect(response.status).toBe(422);
      });
    });

    // Missing limit
    describe('Failure: Missing limit', (): void => {
      it('Return status 422', async (): Promise<void> => {
        const response = await agent.get(url).query({ page: 1 });
        expect(response.status).toBe(422);
      });
    });

    // Incorrect page type
    describe('Failure: Incorrect page type', (): void => {
      it('Return status 422', async (): Promise<void> => {
        const response = await agent.get(url).query({ page: 'a' });
        expect(response.status).toBe(422);
      });
    });

    // Incorrect limit type
    describe('Failure: Incorrect limit type', (): void => {
      it('Return status 422', async (): Promise<void> => {
        const response = await agent.get(url).query({ limit: 'b' });
        expect(response.status).toBe(422);
      });
    });
  });

  // Get an article with id
  describe('Get /articles/:id', (): void => {
    // Successful request
    describe('Success', (): void => {
      let mock: ArticleInput;
      let id: Schema.Types.ObjectId;

      // Insert mock data to database
      beforeEach(
        (done): void => {
          mock = mockGenerator(1)[0];
          ArticleModel.create(mock).then(
            (doc): void => {
              id = doc._id;
              done();
            }
          );
        }
      );

      // Remove mocking data in database
      afterEach(
        (done): void => {
          ArticleModel.deleteMany({}, done);
        }
      );

      // Test
      it('Return status 200 with a article object', async (): Promise<void> => {
        const response = await agent.get(`${url}/${id}`);
        expect(response.status).toBe(200);
        expect(response.body.article).toEqual(expect.objectContaining(mock));
      });
    });

    // Incorrect id type
    describe('Failure: Incorrect id type', (): void => {
      it('Return status 422', async (): Promise<void> => {
        const response = await agent.get(`${url}/id`);
        expect(response.status).toBe(422);
      });
    });

    // No result
    describe('Failure: No result', (): void => {
      it('Return status 404', async (): Promise<void> => {
        const id = mongoose.Types.ObjectId();
        const response = await agent.get(`${url}/${id}`);
        expect(response.status).toBe(404);
      });
    });
  });
});
