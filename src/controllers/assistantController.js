const asyncHandler = require('../middleware/asyncHandler');
const { getAIRecommendation, services } = require('../services/aiRecommendationService');

const listServices = asyncHandler(async (req, res) => {
  res.json({ items: services });
});

const recommend = asyncHandler(async (req, res) => {
  const result = await getAIRecommendation(req.body.query);
  res.json(result);
});

module.exports = { listServices, recommend };
