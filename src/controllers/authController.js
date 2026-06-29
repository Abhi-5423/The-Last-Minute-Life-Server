const User = require('../models/User');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../middleware/asyncHandler');
const generateToken = require('../utils/generateToken');

const toAuthResponse = (user) => ({
  token: generateToken(user),
  user: { id: user._id, username: user.username, email: user.email, role: user.role }
});

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const exists = await User.exists({ $or: [{ email }, { username }] });
  if (exists) throw new ApiError(409, 'Username or email already exists');

  const user = await User.create({ username, email, password });
  res.status(201).json(toAuthResponse(user));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  if (!user.isActive) throw new ApiError(403, 'Account is disabled');
  res.json(toAuthResponse(user));
});

const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

module.exports = { register, login, me };
