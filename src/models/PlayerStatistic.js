const mongoose = require('mongoose');

const playerStatisticSchema = new mongoose.Schema(
  {
    playerName: { type: String, required: true, trim: true, maxlength: 40, index: true },
    uuid: { type: String, trim: true, index: true },
    rank: { type: String, trim: true, default: 'Player' },
    kills: { type: Number, default: 0, min: 0 },
    deaths: { type: Number, default: 0, min: 0 },
    playtimeMinutes: { type: Number, default: 0, min: 0 },
    score: { type: Number, default: 0, min: 0 },
    lastSeenAt: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model('PlayerStatistic', playerStatisticSchema);
