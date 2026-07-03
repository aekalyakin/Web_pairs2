const express = require('express');
const Vote = require('../models/Vote');
const Poll = require('../models/Poll');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// ── Добавление голоса + определение мэтча ──────────────────────────
router.post('/vote', authMiddleware, async (req, res) => {
  try {
    const { pollId, cardId, vote } = req.body; // vote: true | false | 'maybe'

    if (!pollId || cardId === undefined || vote === undefined) {
      return res.status(400).json({ error: 'Все поля обязательны' });
    }

    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ error: 'Опрос не найден' });

    if (!poll.participants.map(String).includes(String(req.userId))) {
      return res.status(403).json({ error: 'Вы не участник этого опроса' });
    }

    const card = poll.cards.id(cardId);
    if (!card) return res.status(404).json({ error: 'Карточка не найдена' });

    let voteRecord = await Vote.findOne({ pollId, userId: req.userId, cardId });
    if (voteRecord) {
      voteRecord.vote = vote;
      await voteRecord.save();
    } else {
      voteRecord = new Vote({ pollId, userId: req.userId, cardId, vote });
      await voteRecord.save();
    }

    // ── Определяем мэтч: все участники поставили "лайк" этой карточке ──
    let isMatch = false;
    if (vote === true) {
      const allVotesForCard = await Vote.find({ pollId, cardId });
      const likedBy = new Set(
        allVotesForCard.filter(v => v.vote === true).map(v => String(v.userId))
      );
      const allParticipantIds = poll.participants.map(String);
      isMatch = allParticipantIds.length > 1 && allParticipantIds.every(id => likedBy.has(id));
    }

    // ── Досрочное завершение: комната набрана полностью и все проголосовали за все карточки ──
    if (poll.status === 'active' && poll.participants.length >= poll.targetParticipants) {
      const totalVotesNow = await Vote.countDocuments({ pollId });
      const requiredVotes = poll.cards.length * poll.targetParticipants;
      if (requiredVotes > 0 && totalVotesNow >= requiredVotes) {
        poll.status = 'completed';
        await poll.save();
      }
    }

    res.status(201).json({ vote: voteRecord, isMatch });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ── Результаты опроса ───────────────────────────────────────────────
router.get('/results/:pollId', authMiddleware, async (req, res) => {
  try {
    const { pollId } = req.params;
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ error: 'Опрос не найден' });

    if (poll.status === 'active' && poll.votingEndsAt && poll.votingEndsAt <= new Date()) {
      poll.status = 'completed';
      await poll.save();
    }

    const votes = await Vote.find({ pollId });

    const results = poll.cards.map(card => {
      const cardVotes = votes.filter(v => String(v.cardId) === String(card._id));
      const yes    = cardVotes.filter(v => v.vote === true).length;
      const no     = cardVotes.filter(v => v.vote === false).length;
      const maybe  = cardVotes.filter(v => v.vote === 'maybe').length;
      const total  = cardVotes.length;
      const percent = total > 0 ? Math.round((yes / total) * 100) : 0;

      return {
        cardId: card._id,
        title: card.title,
        description: card.description,
        imageBase64: card.imageBase64 || null,
        yes, no, maybe, total, percent,
        participants: poll.participants.length,
      };
    });

    results.sort((a, b) => b.percent - a.percent);

    const totalPossible = poll.cards.length * poll.participants.length;
    res.json({
      pollId,
      title: poll.title,
      status: poll.status,
      votingEndsAt: poll.votingEndsAt,
      totalParticipants: poll.participants.length,
      results,
      completionRate: totalPossible > 0 ? Math.round((votes.length / totalPossible) * 100) : 0,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/user-votes/:pollId', authMiddleware, async (req, res) => {
  try {
    const votes = await Vote.find({ pollId: req.params.pollId, userId: req.userId });
    res.json(votes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
