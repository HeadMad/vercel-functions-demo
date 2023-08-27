import bot from '../src/bot.js';

export default function(req, res) {
  bot.sendMessage({
    chat_id: 1271693775,
    text: 'hi there!'
  }).then(result => {
    res.status(200).json(result);
  })
};