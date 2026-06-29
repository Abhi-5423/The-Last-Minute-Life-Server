const mongoose = require('mongoose');

const serverStatusSchema = new mongoose.Schema(
  {
    serverName: { type: String, required: true, trim: true, maxlength: 100 },
    host: { type: String, required: true, trim: true },
    port: { type: Number, required: true, min: 1, max: 65535 },
    status: { type: String, enum: ['online', 'offline', 'maintenance'], default: 'offline' },
    currentPlayers: { type: Number, default: 0, min: 0 },
    maxPlayers: { type: Number, required: true, min: 1 },
    version: { type: String, trim: true },
    motd: { type: String, trim: true, maxlength: 300 },
    lastCheckedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ServerStatus', serverStatusSchema);
