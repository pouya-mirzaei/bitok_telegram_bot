import TelegramBot from 'node-telegram-bot-api';

const showMainMenu = (bot: TelegramBot, chatId: TelegramBot.ChatId) => {
  bot.sendMessage(chatId, 'به ربات بیتوک خیلی خوش اومدی', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'جشن معارفه 1403 🥳', callback_data: 'homecoming' }],
        [
          { text: 'درباره ما 📃', callback_data: 'about-us' },
          { text: 'انتقادات و پیشنهادات 🗣', callback_data: 'comments' },
        ],
      ],
    },
  });
};

export default showMainMenu;
