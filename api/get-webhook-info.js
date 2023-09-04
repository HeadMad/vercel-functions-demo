import bot from '../src/bot.js';

export default function (req, res) {
  // res.status(200).json({hello:process.env.TOKEN})
  const result = bot.getWebhookInfo();
  res.status(200).send(`<pre>${JSON.stringify(result, null, ' ')}</pre>`);
}