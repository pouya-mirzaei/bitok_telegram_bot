import TelegramBot from 'node-telegram-bot-api';
import { showMainMenu } from '../utils/functions';

const startCommand = (bot: TelegramBot) => {
  bot.onText(/\/start/, (msg: TelegramBot.Message) => {
    showMainMenu(bot, msg.chat.id);
  });
};

export default startCommand;
