const controllers = require('../controllers');
const createResourceRoutes = require('./routeFactory');
const validators = require('../validators/resourceValidators');

/**
 * @openapi
 * /announcements:
 *   get: { tags: [Announcements], summary: List active announcements }
 *   post:
 *     tags: [Announcements]
 *     summary: Create an announcement. Admin only.
 *     security: [{ bearerAuth: [] }]
 * /announcements/{id}:
 *   get: { tags: [Announcements], summary: Get an active announcement by id }
 *   put:
 *     tags: [Announcements]
 *     summary: Update an announcement. Admin only.
 *     security: [{ bearerAuth: [] }]
 *   delete:
 *     tags: [Announcements]
 *     summary: Delete an announcement. Admin only.
 *     security: [{ bearerAuth: [] }]
 */
module.exports = createResourceRoutes(controllers.announcements, validators.announcement);
