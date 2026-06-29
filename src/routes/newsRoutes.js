const controllers = require('../controllers');
const createResourceRoutes = require('./routeFactory');
const validators = require('../validators/resourceValidators');

/**
 * @openapi
 * /news:
 *   get: { tags: [News], summary: List published news }
 *   post:
 *     tags: [News]
 *     summary: Create news. Admin only.
 *     security: [{ bearerAuth: [] }]
 * /news/{id}:
 *   get: { tags: [News], summary: Get published news by id }
 *   put:
 *     tags: [News]
 *     summary: Update news. Admin only.
 *     security: [{ bearerAuth: [] }]
 *   delete:
 *     tags: [News]
 *     summary: Delete news. Admin only.
 *     security: [{ bearerAuth: [] }]
 */
module.exports = createResourceRoutes(controllers.news, validators.news);
