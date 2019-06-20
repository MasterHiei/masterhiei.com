import { Server } from 'http';
import mongoose from 'mongoose';

/**
 * Connect to MongoDB
 * @param done jest done callback
 */
const connect = (done: jest.DoneCallback): void => {
  mongoose
    .connect('mongodb://127.0.0.1:27017', {
      dbName: 'test_db_masterhiei_com',
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then((): void => {
      if (done) {
        done();
      }
    });
};

/**
 * Disconnect MongoDB and close server
 * @param server Http server
 * @param done jest done callback
 */
const disconnect = (server: Server, done: jest.DoneCallback): void => {
  mongoose.disconnect().then((): void => {
    server.close(done);
  });
};

export default { connect, disconnect };
