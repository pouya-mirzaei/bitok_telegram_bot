import TelegramBot from 'node-telegram-bot-api';
import pool from '../db';

const authentication = (bot: TelegramBot) => {
  bot.onText(/\/auth (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const username = msg.chat.username;
    const providedPass = match?.[1];
    const adminPass = process.env.ADMIN_PASS; // Store this securely
    if (providedPass === adminPass) {
      // Check if the admin already exists in the database
      const result: any = await pool.query('SELECT * FROM admins WHERE telegram_id = ?', [chatId]);
      if (!result[0].length) {
        // Insert the new admin
        await pool.query('INSERT INTO admins (telegram_id, username) VALUES (?, ?)', [chatId, username]);

        bot.sendMessage(chatId, 'احراز هویت با موفقیت انجام شد. شما اکنون مدیر می باشید.');
      } else {
        bot.sendMessage(chatId, 'شما قبلا به عنوان مدیر احراز هویت شده اید.');
      }
    } else {
      bot.sendMessage(chatId, 'احراز هویت ناموفق بود.');
    }
  });
};
export default authentication;
