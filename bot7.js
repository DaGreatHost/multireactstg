
const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT7_TOKEN);

bot.on('channel_post', async (ctx) => {
    try {
        const messageId = ctx.channelPost.message_id;
        const emojis = ['❤️', '🔥', '👍', '🎉', '👌', '💯', '😍', '👏'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        await ctx.telegram.setMessageReaction(ctx.chat.id, messageId, [
            { type: 'emoji', emoji: randomEmoji }
        ]);
    } catch (error) {
        console.error(`Bot 7 reaction error:`, error);
    }
});

bot.launch();
console.log("Bot 7 is running...");
