import bot from './src/bot';

export default async function handler(req, res) {
  if (!req.body)
    return res.status(400).json({ error: 'No request body' });

  console.log(JSON.stringify(req.body));
  bot.process(req.body);
}