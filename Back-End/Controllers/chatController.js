const ChatMessage = require('../models/ChatMessage');
const OpenAI = require("openai");
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateReply = async (input) => {
  const msg = input.toLowerCase();

  if (msg.includes('course')) return 'We offer Web Dev, DSA, and more!';
  if (msg.includes('price')) return 'Courses start at ₹1,499. Scholarships available!';
  if (msg.includes('hello') || msg.includes('hi')) return 'Hi there! How can I help you today?';

  try {
    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input,
      store: true
    });

    return response.output_text;
  } catch (error) {
    console.error(' OpenAI SDK Error:', error.response?.data || error.message);

    if (error.response?.status === 429) {
      return " Too many requests right now. Please try again shortly!";
    }

    if (error.response?.data?.error?.code === 'insufficient_quota') {
      return "🚫 You've exceeded your OpenAI quota. Please check your billing plan.";
    }

    return "Sorry! I wasn’t able to generate a response this time.";
  }
};

exports.saveMessage = async (sender, message) => {
  const chat = new ChatMessage({ sender, message, timestamp: new Date() });
  await chat.save();
};