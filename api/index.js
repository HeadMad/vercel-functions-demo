import bot from '../src/bot.js';

export default async function handler(req, res) {
  // if (!req.body)
  //   return res.status(400).json({ error: 'No request body' });
// res.status(200).send();
  // bot.getMe().then(result => {
  //   res.status(200).send(result);
  // });

  // console.log(JSON.stringify(req.body));
  console.log('debug 1');
  // bot.process({
  //   "update_id": 83019536,
  //   "message": {
  //    "message_id": 1863,
  //    "from": {
  //     "id": 1271693775,
  //     "is_bot": false,
  //     "first_name": "Павел",
  //     "username": "kovapaul",
  //     "language_code": "ru"
  //    },
  //    "chat": {
  //     "id": 1271693775,
  //     "first_name": "Павел",
  //     "username": "kovapaul",
  //     "type": "private"
  //    },
  //    "date": 1692690612,
  //    "text": "thyuhe"
  //   }
  //  });
  res.status(200).send('');
}