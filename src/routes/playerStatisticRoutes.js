const controllers = require('../controllers');
const createResourceRoutes = require('./routeFactory');
const validators = require('../validators/resourceValidators');

/**
 * @openapi
 * /player-statistics:
 *   get: { tags: [Player Statistics], summary: List player statistics }
 *   post:
 *     tags: [Player Statistics]
 *     summary: Create player statistics. Admin only.
 *     security: [{ bearerAuth: [] }]
 * /player-statistics/{id}:
 *   get: { tags: [Player Statistics], summary: Get player statistics by id }
 *   put:
 *     tags: [Player Statistics]
 *     summary: Update player statistics. Admin only.
 *     security: [{ bearerAuth: [] }]
 *   delete:
 *     tags: [Player Statistics]
 *     summary: Delete player statistics. Admin only.
 *     security: [{ bearerAuth: [] }]
 */
module.exports = createResourceRoutes(controllers.playerStats, validators.playerStats);
