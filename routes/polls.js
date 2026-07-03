const express = require('express');
const mongoose = require('mongoose');
const Poll = require('../models/Poll');
const Vote = require('../models/Vote');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

function generateSessionCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Если время голосования истекло, а статус ещё 'active' — переводим в 'completed'.
// Вызывается лениво при каждом обращении к опросу, отдельный cron не нужен.
async function autoExpireIfNeeded(poll) {
  if (poll.status === 'active' && poll.votingEndsAt && poll.votingEndsAt <= new Date()) {
    poll.status = 'completed';
    await poll.save();
  }
  return poll;
}

// ── Список опросов текущего пользователя (для главного экрана) ─────
router.get('/mine', authMiddleware, async (req, res) => {
  try {
    const polls = await Poll.find({ participants: req.userId })
      .sort({ createdAt: -1 })
      .limit(30);

    const enriched = await Promise.all(
      polls.map(async (poll) => {
        await autoExpireIfNeeded(poll);
        const totalVotesNeeded = poll.cards.length * poll.participants.length;
        const votesCount = totalVotesNeeded > 0
          ? await Vote.countDocuments({ pollId: poll._id })
          : 0;
        return {
          _id: poll._id,
          title: poll.title,
          category: poll.category,
          status: poll.status,
          cardsCount: poll.cards.length,
          participantsCount: poll.participants.length,
          progress: totalVotesNeeded > 0 ? Math.round((votesCount / totalVotesNeeded) * 100) : 0,
          sessionCode: poll.sessionCode,
          createdAt: poll.createdAt,
          votingEndsAt: poll.votingEndsAt,
        };
      })
    );

    res.json(enriched);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { title, category, scenario, participants = [] } = req.body;
    if (!title || !category || !scenario) {
      return res.status(400).json({ error: 'Заполните все обязательные поля' });
    }

    const sessionCode = generateSessionCode();
    const poll = new Poll({
      title, category, scenario,
      createdBy: req.userId,
      participants: [...new Set([...participants, String(req.userId)])],
      sessionCode,
      cards: [],
    });
    await poll.save();
    await poll.populate('participants', 'name photoUrl telegramUsername');

    res.status(201).json({ poll, message: 'Опрос создан. Код: ' + sessionCode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/join', authMiddleware, async (req, res) => {
  try {
    const { sessionCode } = req.body;
    if (!sessionCode) return res.status(400).json({ error: 'Код сессии обязателен' });

    const poll = await Poll.findOne({ sessionCode: sessionCode.toUpperCase() });
    if (!poll) return res.status(404).json({ error: 'Опрос не найден' });

    if (!poll.participants.map(String).includes(String(req.userId))) {
      poll.participants.push(req.userId);
      await poll.save();
    }
    await poll.populate('participants', 'name photoUrl telegramUsername');

    res.json({ poll, message: 'Вы присоединились к опросу' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:pollId', authMiddleware, async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.pollId)
      .populate('participants', 'name photoUrl telegramUsername')
      .populate('createdBy', 'name photoUrl');

    if (!poll) return res.status(404).json({ error: 'Опрос не найден' });
    if (!poll.participants.some(p => String(p._id) === String(req.userId))) {
      return res.status(403).json({ error: 'Вы не участник этого опроса' });
    }

    await autoExpireIfNeeded(poll);
    res.json(poll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:pollId/cards', authMiddleware, async (req, res) => {
  try {
    const { title, description, imageBase64, links } = req.body;
    const { pollId } = req.params;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Название варианта обязательно' });
    }

    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ error: 'Опрос не найден' });

    if (poll.scenario === 'personal' && String(poll.createdBy) !== String(req.userId)) {
      return res.status(403).json({ error: 'Только создатель может добавлять карточки' });
    }

    const cardId = new mongoose.Types.ObjectId();
    const newCard = {
      _id: cardId,
      title: title.trim(),
      description: (description || '').trim(),
      imageBase64: imageBase64 || null,
      links: links || [],
      createdBy: req.userId,
    };

    poll.cards.push(newCard);
    await poll.save();

    res.status(201).json({ card: newCard, message: 'Карточка добавлена' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:pollId/cards/:cardId', authMiddleware, async (req, res) => {
  try {
    const { pollId, cardId } = req.params;
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ error: 'Опрос не найден' });

    const card = poll.cards.id(cardId);
    if (!card) return res.status(404).json({ error: 'Карточка не найдена' });

    if (String(card.createdBy) !== String(req.userId) && String(poll.createdBy) !== String(req.userId)) {
      return res.status(403).json({ error: 'Нет прав на удаление' });
    }

    card.deleteOne();
    await poll.save();
    res.json({ message: 'Карточка удалена' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:pollId/start-voting', authMiddleware, async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.pollId);
    if (!poll) return res.status(404).json({ error: 'Опрос не найден' });

    if (String(poll.createdBy) !== String(req.userId)) {
      return res.status(403).json({ error: 'Только создатель может запустить голосование' });
    }
    if (poll.cards.length === 0) {
      return res.status(400).json({ error: 'Добавьте карточки перед голосованием' });
    }
    if (poll.participants.length < 2) {
      return res.status(400).json({ error: 'Нужен ещё хотя бы один участник, чтобы начать голосование' });
    }

    poll.status = 'active';
    const durationMinutes = [15, 60, 180].includes(Number(req.body.durationMinutes))
      ? Number(req.body.durationMinutes)
      : 60; // если прислали что-то неожиданное — час по умолчанию
    poll.votingDurationMinutes = durationMinutes;
    poll.votingEndsAt = new Date(Date.now() + durationMinutes * 60 * 1000);
    await poll.save();
    res.json({ poll, message: 'Голосование началось' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:pollId/complete', authMiddleware, async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.pollId);
    if (!poll) return res.status(404).json({ error: 'Опрос не найден' });
    if (String(poll.createdBy) !== String(req.userId)) {
      return res.status(403).json({ error: 'Только создатель может завершить опрос' });
    }
    poll.status = 'completed';
    await poll.save();
    res.json({ poll, message: 'Опрос завершён' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
