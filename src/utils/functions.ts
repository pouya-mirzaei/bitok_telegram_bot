import TelegramBot from 'node-telegram-bot-api';
import pool from '../db';

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

const notifyAdmins = async (bot: TelegramBot, msg: TelegramBot.Message, messageId?: number) => {
  bot.deleteMessage(msg.chat.id, messageId as number);
  const admins = await getAdmins();

  await pool.query('INSERT INTO anonymous_messages (user_id, message_text,username) VALUES (?, ?,?)', [
    msg.chat.id,
    msg.text,
    msg.from?.username,
  ]);

  for (let admin of admins) {
    if (msg.text?.trim() === '') return;
    await bot.sendMessage(admin.telegram_id, `✉️ @${msg.from?.username} ✉️\n\n*${msg.text}*`, {
      parse_mode: 'Markdown',
    });
  }
  bot.sendMessage(msg.chat.id, '✉️ پیام شما با موفقیت ارسال شد.', {
    reply_markup: {
      inline_keyboard: [[{ text: 'بازگشت به صفحه اصلی', callback_data: 'homepage' }]],
    },
  });
};

const getAdmins = async () => {
  const result: any = await pool.query('SELECT * FROM admins');
  return result[0];
};

export { showMainMenu, notifyAdmins };
