
const { Telegraf } = require('telegraf');
const fs = require('fs');
require('dotenv').config();

const whitelist = JSON.parse(fs.readFileSync('whitelist.json'));
const bot = new Telegraf(process.env.BOT13_TOKEN);
const ADMIN_IDS = ['6347842836', '7712850427'];

const notAllowedMessage = `⚠️ This bot is not authorized in this channel.\n\nTo activate reactions, please request access via 👉 @trendspaymentbot`;

bot.on('channel_post', async (ctx) => {
    const chatId = ctx.chat.id.toString();

    if (!whitelist.includes(chatId)) {
        try {
            await ctx.telegram.sendMessage(chatId, notAllowedMessage);
            console.log(`❌ Unauthorized channel attempted: ${chatId}`);
        } catch (e) {
            console.error(`❌ Unable to notify channel ${chatId}:`, e.description);
        }
        return;
    }

    try {
        const messageId = ctx.channelPost.message_id;
        const emojis = ['❤️', '🔥', '👍', '🎉', '💯', '😍', '👏'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        await ctx.telegram.setMessageReaction(chatId, messageId, [
            { type: 'emoji', emoji: randomEmoji }
        ]);
        console.log(`✅ Bot 13 reacted in channel: ${chatId}`);
    } catch (error) {
        console.error(`❌ Bot 13 error:`, error);
    }
});

bot.command('status', (ctx) => {
    if (!ADMIN_IDS.includes(ctx.from.id.toString())) return;
    ctx.reply("✅ Bot 13 is online and ready.");
});

bot.launch();
console.log("✅ Bot 13 is running...");
