const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  telegramId: { type: String, unique: true, sparse: true },
  telegramUsername: { type: String, default: null },
  photoUrl: { type: String, default: null },

  phone: { type: String, unique: true, sparse: true, trim: true },
  password: {
    type: String,
    required: function () { return !this.telegramId; },
  },

  name: { type: String, required: true, trim: true },
  plan: { type: String, enum: ['free', 'pair', 'group'], default: 'free' },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  if (!this.password) return false;
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
