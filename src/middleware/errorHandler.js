const mongoose = require('mongoose');
const config = require('../config/env');
const logger = require('../utils/logger');

const errorHandler = (err, req, res, _next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';
  let details = err.details || null;

  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = 'Validation failed';
    details = Object.values(err.errors).map((error) => error.message);
  }

  if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = 'Invalid resource identifier';
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = 'Duplicate resource';
    details = Object.keys(err.keyValue || {});
  }

  if (statusCode >= 500) {
    logger.error(message, { stack: err.stack });
  }

  res.status(statusCode).json({
    message,
    ...(details && { details }),
    ...(config.nodeEnv !== 'production' && { stack: err.stack })
  });
};

module.exports = errorHandler;
