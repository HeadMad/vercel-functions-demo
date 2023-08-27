import Telegrambo from "../lib/telegrambo";

const bot = new Telegrambo(process.env.TOKEN);

bot.on("message", (ctx) => {
  ctx.sendMessage({
    text: ctx.message.text
  });
});

export default bot;