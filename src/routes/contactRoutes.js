const express = require('express');
const contactController = require('../controllers/contactController');
const { authenticate, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { mongoIdParam } = require('../validators/commonValidators');
const validators = require('../validators/resourceValidators');

const router = express.Router();

/**
 * @openapi
 * /contact-messages:
 *   post: { tags: [Contact Messages], summary: Submit a contact message }
 *   get:
 *     tags: [Contact Messages]
 *     summary: List contact messages. Admin only.
 *     security: [{ bearerAuth: [] }]
 * /contact-messages/{id}:
 *   put:
 *     tags: [Contact Messages]
 *     summary: Update contact message status. Admin only.
 *     security: [{ bearerAuth: [] }]
 *   delete:
 *     tags: [Contact Messages]
 *     summary: Delete a contact message. Admin only.
 *     security: [{ bearerAuth: [] }]
 */
router.post('/', validators.contact, validate, contactController.createMessage);
router.get('/', authenticate, authorize('admin'), contactController.listMessages);
router.put('/:id', authenticate, authorize('admin'), mongoIdParam, validators.contactStatus, validate, contactController.updateMessageStatus);
router.delete('/:id', authenticate, authorize('admin'), mongoIdParam, validate, contactController.deleteMessage);

module.exports = router;
