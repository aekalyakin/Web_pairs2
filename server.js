require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const pollRoutes = require('./routes/polls');
const voteRoutes = require('./routes/votes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' })); // фото карточек в base64
app.use(express.urlencoded({ limit: '10mb', extended: true }));

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI не задан в переменных окружения!');
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET не задан в переменных окружения!');
  process.exit(1);
}
if (!process.env.TELEGRAM_BOT_TOKEN) {
  console.warn('⚠️  TELEGRAM_BOT_TOKEN не задан — вход через Telegram работать не будет');
}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB подключена'))
  .catch(err => { console.error('MongoDB ошибка:', err.message); process.exit(1); });

app.use('/api/auth', authRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/votes', voteRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date(), env: process.env.NODE_ENV || 'development' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
