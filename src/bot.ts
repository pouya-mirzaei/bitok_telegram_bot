import TelegramBot from 'node-telegram-bot-api';
import config from './config';
import startCommand from './commands/start';
import answerQuery from './queries/answerQueries';
import showMainMenu from './utils/functions';

require('dotenv').config();

const bot = new TelegramBot(config.botToken, { polling: true });

startCommand(bot);

answerQuery(bot, 'homecoming', async (query) => {
  bot.editMessageText('برای شروع میتونی پیام ناشناس برای ما بفرستی :)', {
    chat_id: query.message?.chat.id,
    message_id: query.message?.message_id,
    reply_markup: {
      inline_keyboard: [[{ text: 'بازگشت به صفحه اصلی', callback_data: 'homepage' }]],
    },
  });

  bot.once('message', (msg) => {
    console.log('replying =>' + msg.text);
  });
});

answerQuery(bot, 'homepage', async (query) => {
  bot.deleteMessage(query.message?.chat.id as TelegramBot.ChatId, query.message?.message_id as number);
  showMainMenu(bot, query.message?.chat.id as TelegramBot.ChatId);
});

export default bot;
