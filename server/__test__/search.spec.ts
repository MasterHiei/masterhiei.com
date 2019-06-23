import { Server } from 'http';
import request, { SuperTest, Test } from 'supertest';
import app from '../app';
import ArticleModel, { Article } from '../models/article';
import fuse from '../utils/fuse';
import mongoDB from './utils/mongoDB';
import mockGenerator from './__mocks__/article';

// Base url
const url = '/api/v1/search';

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
describe('Testing Search Routing', (): void => {
  // Get search result
  describe('Get /search', (): void => {
    // Successful request
    describe('Success', (): void => {
      // Mock data
      let mocks: Article[];

      // Insert mock data to database
      beforeAll(
        async (done): Promise<void> => {
          mocks = await ArticleModel.insertMany(mockGenerator(5));
          done();
        }
      );

      // Remove mock data in database
      afterAll((done): void => {
        ArticleModel.deleteMany({}, done);
      });

      // Test
      it('Returns status 200 with a list of search result', async (): Promise<
        void
      > => {
        // Test status code
        const keywords = mocks[0].tags[0];
        const response = await agent.get(url).query({ keywords });
        expect(response.status).toBe(200);

        // Test search result
        const searchResult = fuse.findArticles(mocks, keywords);
        const articles = response.body.articles;
        expect(JSON.stringify(searchResult)).toEqual(JSON.stringify(articles));
      });
    });

    // Success but no results
    describe('Success but no results', (): void => {
      it('Returns status 200 with a empty list', async (): Promise<void> => {
        const response = await agent
          .get(url)
          .query({ keywords: 'testtesttesttest' });
        expect(response.status).toBe(200);
        expect(response.body.articles).toEqual([]);
      });
    });
  });
});

// Missing keywords
describe('Failure: Missing keywords', (): void => {
  it('Returns status 422', async (): Promise<void> => {
    const response = await agent.get(url);
    expect(response.status).toBe(422);
  });
});

// Empty keywords
describe('Failure: Empty keywords', (): void => {
  it('Returns status 422', async (): Promise<void> => {
    const response = await agent.get(url).query({ keywords: '' });
    expect(response.status).toBe(422);
  });
});
