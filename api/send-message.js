import bot from '../src/bot.js';

export default function(req, res) {
  const result = bot.sendMessage({
    chat_id: 1271693775,
    text: 'hi there!'
  });
  res.status(200).json(result);
};