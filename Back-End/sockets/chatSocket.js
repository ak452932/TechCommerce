const { generateReply, saveMessage } = require('../controllers/chatController');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('✅ User connected');

    socket.on('user message', async (msg) => {
      const reply = await generateReply(msg);
      socket.emit('bot message', reply);
      await saveMessage('user', msg);
      await saveMessage('bot', reply);
    });

    socket.on('disconnect', () => {
      console.log('❌ User disconnected');
    });
  });
};