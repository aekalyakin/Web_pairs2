const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const { verifyTelegramInitData } = require('../utils/telegramAuth');

const router = express.Router();

router.post('/telegram', async (req, res) => {
  try {
    const { initData } = req.body;
    if (!initData) return res.status(400).json({ error: 'initData обязателен' });

    const { valid, data } = verifyTelegramInitData(initData, process.env.TELEGRAM_BOT_TOKEN);
    if (!valid || !data?.id) {
      return res.status(401).json({ error: 'Не удалось подтвердить данные Telegram' });
    }

    const telegramId = String(data.id);
    const name = [data.first_name, data.last_name].filter(Boolean).join(' ') || 'Пользователь';

    let user = await User.findOne({ telegramId });
    if (!user) {
      user = new User({
        telegramId,
        telegramUsername: data.username || null,
        photoUrl: data.photo_url || null,
        name,
      });
      await user.save();
    } else {
      user.name = name;
      user.telegramUsername = data.username || user.telegramUsername;
      user.photoUrl = data.photo_url || user.photoUrl;
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.json({
      token,
      user: {
        id: user._id, name: user.name,
        telegramUsername: user.telegramUsername,
        photoUrl: user.photoUrl,
        plan: user.plan,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { phone, name, password } = req.body;
    if (!phone || !name || !password) return res.status(400).json({ error: 'Заполните все поля' });

    const existing = await User.findOne({ phone });
    if (existing) return res.status(400).json({ error: 'Пользователь с таким номером уже существует' });

    const user = new User({ phone, name, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(201).json({ user: { id: user._id, name: user.name, phone: user.phone, plan: user.plan }, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) return res.status(400).json({ error: 'Номер и пароль обязательны' });

    const user = await User.findOne({ phone });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Неверные учётные данные' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ user: { id: user._id, name: user.name, phone: user.phone, plan: user.plan }, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
