// import bot from '../src/bot.js';
import Telegrambo from "../lib/telegrambo/index.js";

const bot = new Telegrambo(process.env.TOKEN);
// bot.on("message", (ctx) => {
//   return ctx.result.sendMessage({
//     text:`<pre><code>${JSON.stringify(ctx.update, null, ' ')}</code></pre>`,
//     parse_mode: 'HTML'
//   });
// });

bot.on('message::array::', ({result}, event, match) => {
  return match
  // return result.sendMessage({text: 'EAH!', event, match})
});

export default async function handler(req, res) {
  if (req.method === 'GET') {

    const update = {
      "update_id": 83019677,
      "message": {
       "array": ["hello", "take", "me", 28736, {some: 'Some', take:24}, ['hi', {take: 18}]],
       "message_id": 2121,
       "from": {
        "id": 1271693775,
        "is_bot": false,
        "first_name": "Павел",
        "username": "kovapaul",
        "language_code": "ru"
       },
       "chat": {
        "id": 1271693775,
        "first_name": "Павел",
        "username": "kovapaul",
        "type": "private"
       },
       "date": 1694628327,
       "text": "/start"
      }
     };

    const results = bot.process(update);
    console.log(results);
    res.status(200).send(`<pre>${JSON.stringify(results, null, ' ')}</pre>`);

  } else 

  res.status(200).send('ok');
}