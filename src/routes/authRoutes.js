const express = require('express');
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const validate = require('../middleware/validate');
const authValidators = require('../validators/authValidators');

const router = express.Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a user account.
 *     responses:
 *       201: { description: Registered successfully }
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login and receive a JWT.
 *     responses:
 *       200: { description: Logged in successfully }
 * /auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Get the current authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Current user }
 */
router.post('/register', authValidators.register, validate, authController.register);
router.post('/login', authValidators.login, validate, authController.login);
router.get('/me', authenticate, authController.me);

module.exports = router;
