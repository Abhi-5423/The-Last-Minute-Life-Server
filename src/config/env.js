require('dotenv').config();

const cleanEnv = (key) => {
  const value = process.env[key];
  if (!value) return value;
  return value.trim().replace(/^['"]|['"]$/g, '');
};

const required = ['MONGODB_URI', 'JWT_SECRET'];

required.forEach((key) => {
  if (!cleanEnv(key)) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

const mongoUri = cleanEnv('MONGODB_URI');
const validMongoUri = /^mongodb(\+srv)?:\/\//.test(mongoUri);

if (!validMongoUri) {
  throw new Error('Invalid MONGODB_URI. It must start with mongodb:// or mongodb+srv://');
}

module.exports = {
  nodeEnv: cleanEnv('NODE_ENV') || 'development',
  port: Number(cleanEnv('PORT')) || 5000,
  mongoUri,
  mongoRequired: cleanEnv('MONGODB_REQUIRED')
    ? cleanEnv('MONGODB_REQUIRED') === 'true'
    : (cleanEnv('NODE_ENV') || 'development') === 'production',
  jwtSecret: cleanEnv('JWT_SECRET'),
  jwtExpiresIn: cleanEnv('JWT_EXPIRES_IN') || '7d',
  corsOrigin: cleanEnv('CORS_ORIGIN') ? cleanEnv('CORS_ORIGIN').split(',') : '*',
  rateLimit: {
    windowMs: Number(cleanEnv('RATE_LIMIT_WINDOW_MS')) || 15 * 60 * 1000,
    max: Number(cleanEnv('RATE_LIMIT_MAX')) || 100
  }
};
