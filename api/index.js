import bot from '../src/bot.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const results = bot.process(update);
    console.log(results);

    res.status(200).json(results[0]);

  } else 

  res.status(200).send('ok');
}