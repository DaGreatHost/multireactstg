
const { Telegraf } = require('telegraf');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
const bot = new Telegraf(process.env.BOT1_TOKEN);
const ADMIN_IDS = ['6347842836', '7712850427'];

bot.on('channel_post', async (ctx) => {
    const chatId = ctx.chat.id.toString();
    try {
        const res = await pool.query('SELECT channel_id FROM whitelist WHERE channel_id = $1', [chatId]);
        if (res.rowCount === 0) {
            await ctx.telegram.sendMessage(chatId, `⚠️ This bot is not authorized in this channel.\n\nTo activate reactions, please request access via 👉 @trendspaymentbot`);
            return;
        }

        const messageId = ctx.channelPost.message_id;
        const emojis = ['❤️', '🔥', '👍', '🎉', '💯', '😍', '👏'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        await ctx.telegram.setMessageReaction(chatId, messageId, [
            { type: 'emoji', emoji: randomEmoji }
        ]);
        console.log("✅ Bot 1 reacted in", chatId);
    } catch (err) {
        console.error("❌ Bot 1 error:", err);
    }
});

bot.command('status', (ctx) => {
    if (!ADMIN_IDS.includes(ctx.from.id.toString())) return;
    ctx.reply("✅ Bot 1 is online and connected to PostgreSQL.");
});

bot.launch();
console.log("✅ Bot 1 is running...");
