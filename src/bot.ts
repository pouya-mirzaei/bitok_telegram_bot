import TelegramBot from 'node-telegram-bot-api';
import config from './config';
import startCommand from './commands/start';
import answerQuery from './queries/answerQueries';
import { notifyAdmins, showMainMenu, submitComment } from './utils/functions';
import authentication from './commands/auth';

require('dotenv').config();

const bot = new TelegramBot(config.botToken, { polling: true });

startCommand(bot);
authentication(bot);

answerQuery(bot, 'homecoming', async (query) => {
  bot.editMessageText('پیامتو اینجا برامون بفرس 👇', {
    chat_id: query.message?.chat.id,
    message_id: query.message?.message_id,
    reply_markup: {
      inline_keyboard: [[{ text: 'بازگشت به صفحه اصلی', callback_data: 'homepage' }]],
    },
  });

  bot.once('message', (msg) => {
    bot.deleteMessage(msg.chat.id, query.message?.message_id as number);
    notifyAdmins(bot, msg);
  });
});
answerQuery(bot, 'comments', async (query) => {
  bot.editMessageText('هر گونه انتقاد و یا پیشنهادی دارین رو برامون اینجا بنویسین 🎃', {
    chat_id: query.message?.chat.id,
    message_id: query.message?.message_id,
    reply_markup: {
      inline_keyboard: [[{ text: 'بازگشت به صفحه اصلی', callback_data: 'homepage' }]],
    },
  });

  bot.once('message', (msg) => {
    // notifyAdmins(bot, msg, query.message?.message_id);
    // bot.sendMessage(msg.chat.id, '👍');
    submitComment(bot, msg);
  });
});

answerQuery(bot, 'homepage', async (query) => {
  bot.deleteMessage(query.message?.chat.id as TelegramBot.ChatId, query.message?.message_id as number);
  showMainMenu(bot, query.message?.chat.id as TelegramBot.ChatId);
});

export default bot;
