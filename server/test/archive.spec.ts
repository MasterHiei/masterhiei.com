import { Server } from 'http';
import dayjs from 'dayjs';
import request, { SuperTest, Test } from 'supertest';
import mongoose from 'mongoose';
import every from 'lodash/every';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import app from '../app';
import ArticleModel, { Article } from '../models/article';
import mockGenerator from './mock/article';

// Base url
const url = '/api/v1/archives';

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
        dbName: 'test_db_masterhiei_com',
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
describe('Testing Tag Routing', (): void => {
  // Get tags
  describe('Get /archives', (): void => {
    // Successful request
    describe('Success', (): void => {
      // Mock data
      let mocks: Article[];

      // Insert mock data to database
      beforeAll(
        async (done): Promise<void> => {
          mocks = await ArticleModel.insertMany(mockGenerator(5));

          // Update created date to past
          const past = dayjs().subtract(1, 'month');
          await ArticleModel.findById(
            mocks[0]._id,
            (_, doc): void => {
              if (doc) {
                doc.created_at = past.toDate();
                doc.save(
                  (_, newVal): void => {
                    mocks[0] = newVal;
                  }
                );
              }
            }
          );

          // Update created date to future
          const future = dayjs().add(1, 'month');
          await ArticleModel.findById(
            mocks[1]._id,
            (_, doc): void => {
              if (doc) {
                doc.created_at = future.toDate();
                doc.save(
                  (_, newVal): void => {
                    mocks[1] = newVal;
                  }
                );
              }
            }
          );

          done();
        }
      );

      // Remove mock data in database
      afterAll(
        (done): void => {
          ArticleModel.deleteMany({}, done);
        }
      );

      // Test
      it('Return status 200 with a object includes articles created in last year and date statistics', async (): Promise<
        void
      > => {
        // Test status code
        const response = await agent.get(url);
        expect(response.status).toBe(200);

        // Test article list
        const past = dayjs().subtract(1, 'year');
        const now = dayjs();
        const template = 'YYYYMMDD';
        const filtered = filter(
          mocks,
          (item): boolean =>
            every([
              dayjs(item.created_at).format(template) >= past.format(template),
              dayjs(item.created_at).format(template) <= now.format(template),
            ])
        );
        const descendant = sortBy(filtered, ['created_at', '_id']).reverse();
        const articles = response.body.articles;
        expect(JSON.stringify(articles)).toEqual(JSON.stringify(descendant));

        // Test yearMonthDay list
        const days: string[] = [];
        forEach(
          mocks,
          (item, index): void => {
            days[index] = dayjs(item.created_at).format('YYYY-MM-DD');
          }
        );
        const countedGroup = map(
          groupBy(days),
          (item): object => ({
            date: item[0],
            value: item.length,
          })
        );
        const descendantGroup = sortBy(countedGroup, 'date').reverse();
        expect(response.body.yearMonthDay).toEqual(descendantGroup);
      });
    });

    // Success but no results
    describe('Success but no results', (): void => {
      it('Return status 200 with a empty list', async (): Promise<void> => {
        const response = await agent.get(url);
        expect(response.status).toBe(200);
        expect(response.body.articles).toEqual([]);
        expect(response.body.yearMonthDay).toEqual([]);
      });
    });
  });
});
