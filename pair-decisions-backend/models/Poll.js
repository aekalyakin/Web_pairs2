const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: {
    type: String,
    enum: ['dosug', 'byt', 'intim', 'finance', 'travel', 'career'],
    required: true,
  },
  scenario: { type: String, enum: ['personal', 'shared'], required: true },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  cards: [{
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    imageBase64: String,
    links: [String],
    createdBy: mongoose.Schema.Types.ObjectId,
  }],

  status: { type: String, enum: ['draft', 'active', 'completed'], default: 'draft' },
  sessionCode: { type: String, unique: true, sparse: true },

  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
});

pollSchema.index({ sessionCode: 1 });
pollSchema.index({ participants: 1 });
pollSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Poll', pollSchema);
