// import bot from '../src/bot.js';
import Telegrambo from "../lib/telegrambo/index.js";

const bot = new Telegrambo(process.env.TOKEN);

export default async function handler(req, res) {
  if (req.method === 'POST') {

    bot.on("message", (ctx) => {
      return {...ctx.payload, method: 'sendMessage', text: ctx.message.text};
    });

    const results = bot.process(req.body);
    console.log(results);
    res.status(200).json(results[0]);

  } else 

  res.status(200).send('ok');

}