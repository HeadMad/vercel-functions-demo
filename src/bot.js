import Telegrambo from "../lib/telegrambo/index.js";

const bot = new Telegrambo(process.env.TOKEN);

bot.on("message", (ctx) => {
  console.log(ctx.update)
  ctx.sendMessage({
    text: ctx.message.text
  })
  .then(console.log)
  .catch(console.warn)
  
});

export default bot;