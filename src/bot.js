import Telegrambo from "../lib/telegrambo/index.js";

const bot = new Telegrambo(process.env.TOKEN);

bot.on("message", (ctx) => {
  console.log(ctx.message)
  // console.log('=============')
  ctx.sendMessage({
    text: Date.now()
  })
  .then(console.log)
  .catch(console.log)
  
});

export default bot;