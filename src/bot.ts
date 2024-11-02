import TelegramBot from 'node-telegram-bot-api';
import config from './config';
import startCommand from './commands/start';
require('dotenv').config();

const bot = new TelegramBot(config.botToken, { polling: true });

startCommand(bot);

export default bot;
