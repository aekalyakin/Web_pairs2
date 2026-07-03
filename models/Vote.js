const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  pollId: { type: mongoose.Schema.Types.ObjectId, ref: 'Poll', required: true, index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cardId: { type: mongoose.Schema.Types.ObjectId, required: true },

  vote: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    validate: {
      validator: (v) => v === true || v === false || v === 'maybe',
      message: 'vote должен быть true, false или "maybe"',
    },
  },

  createdAt: { type: Date, default: Date.now },
});

voteSchema.index({ pollId: 1, userId: 1, cardId: 1 }, { unique: true });

module.exports = mongoose.model('Vote', voteSchema);
