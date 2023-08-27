import Telegrambo from "../lib/telegrambo/index.js";

const bot = new Telegrambo(process.env.TOKEN);

bot.on("message", (ctx) => {
  console.log('run handler');
  ctx.sendMessage({
    text: 'mess'
  })
  
});

export default bot;