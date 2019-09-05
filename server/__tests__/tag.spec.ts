import { Server } from 'http';
import request, { SuperTest, Test } from 'supertest';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import flatMap from 'lodash/flatMap';
import flatten from 'lodash/flatten';
import sortBy from 'lodash/sortBy';
import ArticleModel, { Article } from '../models/article';
import mongoDB from './utils/mongoDB';
import mocksGenerator from './__mocks__/article';
import app from '..';

// Base url
const url = '/tags';

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
describe('Testing Tag Routing', (): void => {
  // Get tags
  describe('Get /tags', (): void => {
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
      it('Returns status 200 with a list of tag stats', async (): Promise<
        void
      > => {
        const response = await agent.get(url);
        expect(response.status).toBe(200);

        const tags = flatMap(mocks, (mock): string[] => flatten(mock.tags));
        const countedGroup = map(groupBy(tags), (item): object => ({
          name: item[0],
          value: item.length,
        }));
        const descendantGroup = sortBy(countedGroup, [
          'value',
          'name',
        ]).reverse();
        expect(response.body.tags).toEqual(descendantGroup);
      });
    });

    // Success but no results
    describe('Success but no results', (): void => {
      it('Returns status 200 with an empty list', async (): Promise<void> => {
        const response = await agent.get(url);
        expect(response.status).toBe(200);
        expect(response.body.tags).toEqual([]);
      });
    });
  });

  // Get articles by tag
  describe('Get /tags:tag', (): void => {
    // Successful request
    describe('Success', (): void => {
      // Mock data
      let mocks: Article[];

      // Insert mock data to database
      beforeAll(
        async (done): Promise<void> => {
          mocks = await ArticleModel.insertMany(mocksGenerator());
          done();
        }
      );

      // Remove mock data in database
      afterAll((done): void => {
        ArticleModel.deleteMany({}, done);
      });

      // Test
      it('Returns status 200 with an article list', async (): Promise<void> => {
        const tag = mocks[0].tags[0];
        const response = await agent
          .get(`${url}/${tag}`)
          .query({ page: 1, limit: mocks.length });
        expect(response.status).toBe(200);

        const expected = mocks.filter((mock): boolean =>
          mock.tags.includes(tag)
        );
        const articles = response.body.articles;
        expect(JSON.stringify(articles)).toEqual(JSON.stringify(expected));
      });
    });

    // Success but no results
    describe('Success: no results', (): void => {
      it('Returns status 200 with an empty list', async (): Promise<void> => {
        const response = await agent
          .get(`${url}/tag`)
          .query({ page: 1, limit: 1 });
        expect(response.status).toBe(200);
        expect(response.body.articles).toEqual([]);
      });
    });

    // Missing all params
    describe('Failure: Missing all params', (): void => {
      it('Returns status 422', async (): Promise<void> => {
        const response = await agent.get(`${url}/tag`);
        expect(response.status).toBe(422);
      });
    });

    // Missing page
    describe('Failure: Missing page', (): void => {
      it('Returns status 422', async (): Promise<void> => {
        const response = await agent.get(`${url}/tag`).query({ limit: 4 });
        expect(response.status).toBe(422);
      });
    });

    // Missing limit
    describe('Failure: Missing limit', (): void => {
      it('Returns status 422', async (): Promise<void> => {
        const response = await agent.get(`${url}/tag`).query({ page: 1 });
        expect(response.status).toBe(422);
      });
    });

    // Incorrect page type
    describe('Failure: Incorrect page type', (): void => {
      it('Returns status 422', async (): Promise<void> => {
        const response = await agent.get(`${url}/tag`).query({ page: 'a' });
        expect(response.status).toBe(422);
      });
    });

    // Incorrect limit type
    describe('Failure: Incorrect limit type', (): void => {
      it('Returns status 422', async (): Promise<void> => {
        const response = await agent.get(`${url}/tag`).query({ limit: 'b' });
        expect(response.status).toBe(422);
      });
    });
  });
});
