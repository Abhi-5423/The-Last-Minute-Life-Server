const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { mongoIdParam, pagination } = require('../validators/commonValidators');

const createResourceRoutes = (controller, validators) => {
  const router = express.Router();

  router.get('/', pagination, validate, controller.list);
  router.get('/:id', mongoIdParam, validate, controller.getById);
  router.post('/', authenticate, authorize('admin'), validators, validate, controller.create);
  router.put('/:id', authenticate, authorize('admin'), mongoIdParam, validators, validate, controller.update);
  router.delete('/:id', authenticate, authorize('admin'), mongoIdParam, validate, controller.remove);

  return router;
};

module.exports = createResourceRoutes;
