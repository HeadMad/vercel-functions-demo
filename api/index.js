import bot from '../src/bot.js';

export default async function handler(req, res) {
  // console.log(req.body);
  
  // const results = bot.process({
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
  //  })
  const results = bot.process(req.body);
  console.log(results);
  res.status(200).json('ok');
  
}