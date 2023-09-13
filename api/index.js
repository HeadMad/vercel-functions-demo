// import bot from '../src/bot.js';

const bot = new Telegrambo(process.env.TOKEN);

export default async function handler(req, res) {
  if (req.method === 'POST') {

    bot.on("message", (ctx) => {
      res.status(200).json({...ctx.payload, method: 'sendMessage', text: ctx.message.text});
    });

    const results = bot.process(req.body);
    // console.log(results);
  }

  // res.status(200).send('ok');
}