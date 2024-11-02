const TelegramBot = require('node-telegram-bot-api');
// require('dotenv').config();

export const bot = new TelegramBot(process.env.TELEGRAM_API_KEY, { polling: true });
