const express = require('express');
const { body } = require('express-validator');
const assistantController = require('../controllers/assistantController');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/services', assistantController.listServices);
router.post(
  '/recommendations',
  body('query').trim().isLength({ min: 8, max: 800 }).withMessage('Describe your situation in 8-800 characters'),
  validate,
  assistantController.recommend
);

module.exports = router;
