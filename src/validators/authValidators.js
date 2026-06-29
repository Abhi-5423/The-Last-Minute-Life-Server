const { body } = require('express-validator');

const register = [
  body('username').trim().isLength({ min: 3, max: 30 }).withMessage('username must be 3-30 characters'),
  body('email').isEmail().withMessage('email must be valid').normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('password must be at least 8 characters')
];

const login = [
  body('email').isEmail().withMessage('email must be valid').normalizeEmail(),
  body('password').notEmpty().withMessage('password is required')
];

module.exports = { register, login };
