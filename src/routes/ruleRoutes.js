const controllers = require('../controllers');
const createResourceRoutes = require('./routeFactory');
const validators = require('../validators/resourceValidators');

/**
 * @openapi
 * /rules:
 *   get: { tags: [Rules], summary: List active rules }
 *   post:
 *     tags: [Rules]
 *     summary: Create a rule. Admin only.
 *     security: [{ bearerAuth: [] }]
 * /rules/{id}:
 *   get: { tags: [Rules], summary: Get an active rule by id }
 *   put:
 *     tags: [Rules]
 *     summary: Update a rule. Admin only.
 *     security: [{ bearerAuth: [] }]
 *   delete:
 *     tags: [Rules]
 *     summary: Delete a rule. Admin only.
 *     security: [{ bearerAuth: [] }]
 */
module.exports = createResourceRoutes(controllers.rules, validators.rule);
