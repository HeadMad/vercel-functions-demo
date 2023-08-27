import Telegrambo from "../lib/telegrambo/index.js";

const bot = new Telegrambo(process.env.TOKEN);

bot.on("message", (ctx) => {
  ctx.sendMessage({
    text: JSON.stringify(ctx.update)
  })
  
});

export default bot;