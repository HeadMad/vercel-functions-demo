import bot from '../src/bot.js';

export default async function handler(req, res) {
  // if (!req.body)
  //   return res.status(400).json({ error: 'No request body' });
// res.status(200).send();
  // bot.getMe().then(result => {
  //   res.status(200).send(result);
  // });

  // console.log(JSON.stringify(req.body));
  // console.log('debug 1');
// console.log(process.env.TOKEN)
//   bot.sendMessage({
//     chat_id: 1271693775,
//     text: 'hhhhello',
//   })
  
  bot.process(req.body);
  res.status(200).send('');
}