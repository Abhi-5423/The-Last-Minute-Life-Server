const app = require('./app');
const connectDB = require('./config/db');
const config = require('./config/env');
const logger = require('./utils/logger');

const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    if (config.mongoRequired) throw error;
    logger.warn(`MongoDB unavailable; starting API without database connection: ${error.message}`);
  }

  const server = app.listen(config.port, () => {
    logger.info(`Last Minute Life API running on port ${config.port}`);
  });

  const shutdown = (signal) => {
    logger.info(`${signal} received. Closing server...`);
    server.close(() => {
      logger.info('Server closed.');
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
};

startServer().catch((error) => {
  logger.error('Failed to start server', error);
  process.exit(1);
});
