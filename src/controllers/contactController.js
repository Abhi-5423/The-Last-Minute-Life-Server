const ContactMessage = require('../models/ContactMessage');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../middleware/asyncHandler');

const createMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.create(req.body);
  res.status(201).json({ message: 'Contact message received', item: message });
});

const listMessages = asyncHandler(async (req, res) => {
  const items = await ContactMessage.find().sort('-createdAt');
  res.json({ items });
});

const updateMessageStatus = asyncHandler(async (req, res) => {
  const item = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  );
  if (!item) throw new ApiError(404, 'Contact message not found');
  res.json({ item });
});

const deleteMessage = asyncHandler(async (req, res) => {
  const item = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, 'Contact message not found');
  res.status(204).send();
});

module.exports = { createMessage, listMessages, updateMessageStatus, deleteMessage };
