import bot from '../src/bot.js';

export default async function handler(req, res) {
  console.log(req.body);
  
  bot.process(req.body);
  res.status(200).send('');
}