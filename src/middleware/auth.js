const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/env');
const ApiError = require('../utils/apiError');
const asyncHandler = require('./asyncHandler');

const authenticate = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    throw new ApiError(401, 'Authentication token is required');
  }

  const token = header.split(' ')[1];
  const payload = jwt.verify(token, config.jwtSecret);
  const user = await User.findById(payload.id).select('-password');

  if (!user || !user.isActive) {
    throw new ApiError(401, 'Invalid authentication token');
  }

  req.user = user;
  next();
});

const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new ApiError(403, 'You do not have permission to perform this action'));
  }

  return next();
};

module.exports = { authenticate, authorize };
