import TelegramBot from 'node-telegram-bot-api';

type CallbackAction = (query: TelegramBot.CallbackQuery) => void;

const answerQuery = (bot: TelegramBot, callBackData: string, callbackAction: CallbackAction) => {
  bot.on('callback_query', async (query) => {
    const { id, data, message } = query;
    const chatId = message?.chat.id;

    if (data === callBackData && chatId !== undefined) {
      try {
        bot.answerCallbackQuery({
          callback_query_id: id,
        });

        callbackAction(query);
      } catch (error) {
        console.error('Error handling callback query:', error);
        bot.sendMessage(chatId, 'An error occurred while processing your request.');
      }
    }
  });
};

export default answerQuery;
