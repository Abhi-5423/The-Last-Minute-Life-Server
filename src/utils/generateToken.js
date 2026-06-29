const jwt = require('jsonwebtoken');
const config = require('../config/env');

const generateToken = (user) =>
  jwt.sign({ id: user._id.toString(), role: user.role }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn
  });

module.exports = generateToken;
