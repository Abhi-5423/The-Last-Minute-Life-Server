const controllers = require('../controllers');
const createResourceRoutes = require('./routeFactory');
const validators = require('../validators/resourceValidators');

/**
 * @openapi
 * /staff:
 *   get: { tags: [Staff], summary: List active staff members }
 *   post:
 *     tags: [Staff]
 *     summary: Create a staff member. Admin only.
 *     security: [{ bearerAuth: [] }]
 * /staff/{id}:
 *   get: { tags: [Staff], summary: Get an active staff member by id }
 *   put:
 *     tags: [Staff]
 *     summary: Update a staff member. Admin only.
 *     security: [{ bearerAuth: [] }]
 *   delete:
 *     tags: [Staff]
 *     summary: Delete a staff member. Admin only.
 *     security: [{ bearerAuth: [] }]
 */
module.exports = createResourceRoutes(controllers.staff, validators.staff);
