import Telegrambo from "../lib/telegrambo/index.js";

const bot = new Telegrambo(process.env.TOKEN);

bot.on("message", (ctx) => {
  return ctx.sendMessage({
    text: ctx.message.text
  })
});

export default bot;