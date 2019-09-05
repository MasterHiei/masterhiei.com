import mongoose from 'mongoose';
import consola from 'consola';
import env from './envalid';

/**
 * Add mongoose interceptors
 */
const addInterceptors = (): void => {
  // Listen for mongoose connection successful
  mongoose.connection.on('connected', (): void => {
    // Create models
    require('../models/article');

    // Print message
    consola.ready({
      message: 'MongoDB Connected',
      badge: true,
    });
  });

  // Listen for mongoose connection failed
  mongoose.connection.on('error', (error): void => {
    consola.error({
      message: `MongoDB connection error: ${error}`,
      badge: true,
    });
  });
};

/**
 * Start mongoDB service
 */
const start = (): void => {
  // Get environment variables
  const { isDev, isTest, DB_URI, DB_NAME } = env;

  // Should not work for test environment
  if (isTest) {
    return;
  }

  // Enable debugging if in development environment
  mongoose.set('debug', isDev);

  // Connect to MongoDB
  mongoose.connect(DB_URI, {
    dbName: DB_NAME,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  // Add interceptors
  addInterceptors();
};

export default { start };
