const ApiError = require('../utils/apiError');
const asyncHandler = require('../middleware/asyncHandler');

const pickBody = (body, fields) =>
  fields.reduce((payload, field) => {
    if (Object.prototype.hasOwnProperty.call(body, field)) payload[field] = body[field];
    return payload;
  }, {});

const createCrudController = (Model, options = {}) => {
  const { writableFields = [], defaultSort = '-createdAt', publicFilter = {}, createExtras = null, populate = null } = options;
  const applyPopulate = (query) => (populate ? query.populate(populate) : query);

  return {
    list: asyncHandler(async (req, res) => {
      const page = Math.max(Number(req.query.page) || 1, 1);
      const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);
      const skip = (page - 1) * limit;
      const [items, total] = await Promise.all([
        applyPopulate(Model.find(publicFilter).sort(defaultSort).skip(skip).limit(limit)),
        Model.countDocuments(publicFilter)
      ]);
      res.json({ items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
    }),
    getById: asyncHandler(async (req, res) => {
      const item = await applyPopulate(Model.findOne({ _id: req.params.id, ...publicFilter }));
      if (!item) throw new ApiError(404, 'Resource not found');
      res.json({ item });
    }),
    create: asyncHandler(async (req, res) => {
      const item = await Model.create({ ...pickBody(req.body, writableFields), ...(createExtras ? createExtras(req) : {}) });
      res.status(201).json({ item });
    }),
    update: asyncHandler(async (req, res) => {
      const item = await Model.findByIdAndUpdate(req.params.id, pickBody(req.body, writableFields), {
        new: true,
        runValidators: true
      });
      if (!item) throw new ApiError(404, 'Resource not found');
      res.json({ item });
    }),
    remove: asyncHandler(async (req, res) => {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) throw new ApiError(404, 'Resource not found');
      res.status(204).send();
    })
  };
};

module.exports = createCrudController;
