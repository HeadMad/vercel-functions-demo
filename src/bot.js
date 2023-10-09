import Telegrambo from "../lib/telegrambo/index.js";

const bot = new Telegrambo(process.env.TOKEN);

bot.on('message::text::hello', ({result}, event, match) => {
  return result.sendMessage({text: 'Hey!'});
});

bot.on("message", (ctx) => {
  if (ctx.message.text === '/wifi')
  return ctx.sendMessage({
    text: '<a href="https://clck.ru/362cTJ">Подключиться к WiFi</a>',
    parse_mode: 'HTML'
  });

  return ctx.sendMessage({
    text: `<pre>${JSON.stringify(ctx.update, null, ' ')}</pre>`,
    parse_mode: 'HTML',
  })
});





export default bot;