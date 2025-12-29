const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessage');

// GET chat history
router.get('/history', async (req, res) => {
  try {
    const messages = await ChatMessage.find().sort({ timestamp: -1 }).limit(50);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

module.exports = router;