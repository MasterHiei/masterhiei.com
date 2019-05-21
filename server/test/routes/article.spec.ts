import { Server } from 'http';
import request, { SuperTest, Test } from 'supertest';
import mongoose from 'mongoose';
import app from '../../app';

// Base url
const url = '/api/v1/articles';

// Instance of test server and request
let server!: Server, agent: SuperTest<Test>;

// Create test server
beforeAll(
  (done): void => {
    server = app.listen(4000);
    agent = request(server);
    done();
  }
);

// Close test server
afterAll(
  (done): void => {
    server.close((): void => done());
  }
);

// Routing tests
describe('Testing Article Routing', (): void => {
  // Get articles with query params
  describe('Get articles with query params', (): void => {
    // Successful request
    describe('Success', (): void => {
      it('Return status 200', async (): Promise<void> => {
        const response = await agent.get(url).query({ page: 1, limit: 4 });
        expect(response.status).toBe(200);
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
  describe('Get an article with id', (): void => {
    // TODO: Successful request

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
