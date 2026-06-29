const { body } = require('express-validator');
const { optionalUrl, requiredString } = require('./commonValidators');

const booleanField = (field) => body(field).optional().isBoolean().withMessage(`${field} must be boolean`);
const dateField = (field) => body(field).optional().isISO8601().withMessage(`${field} must be a valid date`);
const intField = (field, min = 0, max = undefined) =>
  body(field).optional().isInt({ min, max }).withMessage(`${field} must be a valid integer`);

module.exports = {
  news: [
    requiredString('title', 160),
    body('slug').trim().matches(/^[a-z0-9-]+$/).withMessage('slug must contain lowercase letters, numbers, and hyphens'),
    requiredString('summary', 300),
    body('content').trim().notEmpty().withMessage('content is required'),
    optionalUrl('imageUrl'),
    booleanField('isPublished'),
    dateField('publishedAt')
  ],
  announcement: [
    requiredString('title', 160),
    body('message').trim().notEmpty().withMessage('message is required'),
    body('severity').optional().isIn(['info', 'maintenance', 'warning', 'critical']),
    dateField('startsAt'),
    dateField('endsAt'),
    booleanField('isActive')
  ],
  staff: [
    requiredString('name', 80),
    requiredString('role', 80),
    body('bio').optional().trim().isLength({ max: 600 }).withMessage('bio is too long'),
    optionalUrl('avatarUrl'),
    intField('displayOrder'),
    booleanField('isActive')
  ],
  serverStatus: [
    requiredString('serverName', 100),
    body('host').trim().notEmpty().withMessage('host is required'),
    body('port').isInt({ min: 1, max: 65535 }).withMessage('port must be 1-65535'),
    body('status').optional().isIn(['online', 'offline', 'maintenance']),
    intField('currentPlayers'),
    body('maxPlayers').isInt({ min: 1 }).withMessage('maxPlayers must be positive'),
    body('version').optional().trim(),
    body('motd').optional().trim().isLength({ max: 300 }).withMessage('motd is too long'),
    dateField('lastCheckedAt')
  ],
  playerStats: [
    requiredString('playerName', 40),
    body('uuid').optional().trim(),
    body('rank').optional().trim(),
    intField('kills'),
    intField('deaths'),
    intField('playtimeMinutes'),
    intField('score'),
    dateField('lastSeenAt')
  ],
  rule: [
    requiredString('title', 120),
    body('description').trim().notEmpty().withMessage('description is required'),
    body('category').optional().trim(),
    intField('displayOrder'),
    booleanField('isActive')
  ],
  gallery: [
    requiredString('title', 120),
    body('imageUrl').isURL().withMessage('imageUrl must be a valid URL'),
    body('caption').optional().trim().isLength({ max: 300 }).withMessage('caption is too long'),
    body('category').optional().trim(),
    intField('displayOrder'),
    booleanField('isPublished')
  ],
  contact: [
    requiredString('name', 80),
    body('email').isEmail().withMessage('email must be valid').normalizeEmail(),
    requiredString('subject', 160),
    body('message').trim().isLength({ min: 5, max: 3000 }).withMessage('message must be 5-3000 characters')
  ],
  contactStatus: [body('status').isIn(['new', 'read', 'closed']).withMessage('status is invalid')]
};
