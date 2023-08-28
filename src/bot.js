import Telegrambo from "../lib/telegrambo/index.js";

const bot = new Telegrambo(process.env.TOKEN);

bot.on("message", (ctx) => {
  return ctx.sendMessage({
    text: `<pre>${JSON.stringify(ctx.update, null, ' ')}</pre>`,
    parse_mode: 'HTML',
  })
});



export default bot;