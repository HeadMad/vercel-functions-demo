import bot from '../src/bot.js';

export default async function handler(req, res) {
  // if (!req.body)
  //   return res.status(400).json({ error: 'No request body' });
// res.status(200).send();
  // bot.getMe().then(result => {
  //   res.status(200).send(result);
  // });

  console.log(JSON.stringify(req.body));
  bot.process(req.body);
  res.status(200).send('');
}