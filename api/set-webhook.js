import bot from '../src/bot.js';

export default function (req, res) {
  // res.status(200).json({hello:process.env.TOKEN})
  const result = bot.setWebhook({url: process.env.WEBHOOK_URL});
  res.status(200).json(result);
}