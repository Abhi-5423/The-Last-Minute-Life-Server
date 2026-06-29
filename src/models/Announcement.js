const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    message: { type: String, required: true, trim: true },
    severity: { type: String, enum: ['info', 'maintenance', 'warning', 'critical'], default: 'info' },
    startsAt: { type: Date, default: Date.now },
    endsAt: { type: Date },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Announcement', announcementSchema);
