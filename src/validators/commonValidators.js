const { body, param, query } = require('express-validator');

const mongoIdParam = [param('id').isMongoId().withMessage('Invalid id')];
const pagination = [
  query('page').optional().isInt({ min: 1 }).withMessage('page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be between 1 and 100')
];
const optionalUrl = (field) => body(field).optional({ checkFalsy: true }).isURL().withMessage(`${field} must be a valid URL`);
const requiredString = (field, max) =>
  body(field).trim().notEmpty().withMessage(`${field} is required`).isLength({ max }).withMessage(`${field} is too long`);

module.exports = { mongoIdParam, pagination, optionalUrl, requiredString };
