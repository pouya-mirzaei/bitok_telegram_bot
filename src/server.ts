import TelegramBot from 'node-telegram-bot-api';

require('dotenv').config();

const bot = require('./config').bot;

bot.on('message', (msg: TelegramBot.Message) => {
  if (msg.text) {
    bot.sendMessage(msg.chat.id, 'Your message: ' + msg.text);
  }
});
