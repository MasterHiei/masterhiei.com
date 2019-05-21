import { Server } from 'http';
import request, { SuperTest, Test } from 'supertest';
import app from '../../app';

// Base path
const path = '/api/v1/articles';

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

// Routers tests
describe('Article Routing Test', (): void => {
  // Success
  describe('Get articles with query params', (): void => {
    it('Should be return 200', (): void => {
      agent.get(`${path}?page=1&limit=4`).expect(200);
    });
  });

  // Failure
  describe('Get articles without query params', (): void => {
    it('Should be return 422', (): void => {
      agent.get(path).expect(422);
    });
  });
});
