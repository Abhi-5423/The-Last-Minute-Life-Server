const controllers = require('../controllers');
const createResourceRoutes = require('./routeFactory');
const validators = require('../validators/resourceValidators');

/**
 * @openapi
 * /gallery:
 *   get: { tags: [Gallery], summary: List published gallery items }
 *   post:
 *     tags: [Gallery]
 *     summary: Create a gallery item. Admin only.
 *     security: [{ bearerAuth: [] }]
 * /gallery/{id}:
 *   get: { tags: [Gallery], summary: Get a published gallery item by id }
 *   put:
 *     tags: [Gallery]
 *     summary: Update a gallery item. Admin only.
 *     security: [{ bearerAuth: [] }]
 *   delete:
 *     tags: [Gallery]
 *     summary: Delete a gallery item. Admin only.
 *     security: [{ bearerAuth: [] }]
 */
module.exports = createResourceRoutes(controllers.gallery, validators.gallery);
