import Telegrambo from "../lib/telegrambo/index.js";

const bot = new Telegrambo(process.env.TOKEN);

bot.on("message", (ctx) => {
  console.log(ctx.message)
  // console.log('=============')
  ctx.sendMessage({
    text: ctx.message.text
  })
  .then(console.log)
  .catch(console.log)
  
});

export default bot;