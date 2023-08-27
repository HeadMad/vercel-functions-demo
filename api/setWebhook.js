import bot from './src/bot';

export default function (req, res) {
  bot.setWebhook({url: 'https://vercel-functions-demo.vercel.app/'})
  .then(result => {
    res.status(200).json(result);
  });
}