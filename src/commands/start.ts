import TelegramBot from 'node-telegram-bot-api';

const startCommand = (bot: TelegramBot) => {
  bot.on('message', (msg: TelegramBot.Message) => {
    if (msg.text === '/start') {
      bot.sendMessage(msg.chat.id, 'به ربات بیتوک خیلی خوش اومدی', {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'جشن معارفه 1403', callback_data: 'start' }],
            [
              { text: 'درباره ما', callback_data: 'about-us' },
              { text: 'انتقادات و پیشنهادات', callback_data: 'comments' },
            ],
          ],
        },
      });
    }
  });
};

export default startCommand;
