import Telegrambo from "../lib/telegrambo/index.js";

const bot = new Telegrambo(process.env.TOKEN);

bot.on("message", (ctx) => {
  bot.sendMessage({
    chat_id: 1271693775,
    text: JSON.stringify(ctx.update),
    parse_mode: 'HTML'
  })
});

export default bot;