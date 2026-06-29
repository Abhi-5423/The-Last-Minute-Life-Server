const connectDB = require('../config/db');
const User = require('../models/User');
const logger = require('./logger');

const createAdmin = async () => {
  const { ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_USERNAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error('ADMIN_USERNAME, ADMIN_EMAIL, and ADMIN_PASSWORD are required');
  }

  await connectDB();

  const existing = await User.findOne({ email: ADMIN_EMAIL }).select('+password');

  if (existing) {
    existing.username = ADMIN_USERNAME;
    existing.password = ADMIN_PASSWORD;
    existing.role = 'admin';
    existing.isActive = true;
    await existing.save();
    logger.info(`Updated admin user: ${ADMIN_EMAIL}`);
  } else {
    await User.create({
      username: ADMIN_USERNAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: 'admin'
    });
    logger.info(`Created admin user: ${ADMIN_EMAIL}`);
  }
};

createAdmin()
  .then(() => process.exit(0))
  .catch((error) => {
    logger.error('Failed to create admin', error);
    process.exit(1);
  });
