import Telegrambo from "../lib/telegrambo/index.js";

const bot = new Telegrambo(process.env.TOKEN);

bot.on("message", (ctx) => {
  return {
    ...ctx.payload,
    text: Date.now()
  }
});

export default bot;