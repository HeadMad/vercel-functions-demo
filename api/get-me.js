import bot from '../src/bot.js';

export default function(req, res) {
  const result = bot.getMe();
  res.status(200).json(result);
};