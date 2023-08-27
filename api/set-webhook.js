import bot from '../src/bot.js';

export default function (req, res) {
  // res.status(200).json({hello:process.env.TOKEN})
  bot.setWebhook({url: process.env.WEBHOOK_URL})
  .then(result => {
    res.status(200).json(result);
  });
}