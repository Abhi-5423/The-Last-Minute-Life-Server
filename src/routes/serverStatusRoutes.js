const controllers = require('../controllers');
const createResourceRoutes = require('./routeFactory');
const validators = require('../validators/resourceValidators');

/**
 * @openapi
 * /server-status:
 *   get: { tags: [Server Status], summary: List server status records }
 *   post:
 *     tags: [Server Status]
 *     summary: Create a server status record. Admin only.
 *     security: [{ bearerAuth: [] }]
 * /server-status/{id}:
 *   get: { tags: [Server Status], summary: Get server status by id }
 *   put:
 *     tags: [Server Status]
 *     summary: Update server status. Admin only.
 *     security: [{ bearerAuth: [] }]
 *   delete:
 *     tags: [Server Status]
 *     summary: Delete server status. Admin only.
 *     security: [{ bearerAuth: [] }]
 */
module.exports = createResourceRoutes(controllers.serverStatus, validators.serverStatus);
