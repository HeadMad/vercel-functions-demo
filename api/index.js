import bot from '../src/bot.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const results = bot.process(req.body);
    console.log(results);
  }

  res.status(200).send('ok');
}