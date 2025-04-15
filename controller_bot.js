
const { Telegraf } = require('telegraf');
const fs = require('fs');
require('dotenv').config();

const controllerBot = new Telegraf(process.env.CONTROLLER_BOT_TOKEN);
const ADMIN_IDS = ['6347842836', '7712850427'];

const whitelistFile = 'whitelist.json';
const backupFile = 'whitelist_backup.json';

function isAdmin(ctx) {
    return ADMIN_IDS.includes(ctx.from.id.toString());
}

function readWhitelist() {
    if (fs.existsSync(whitelistFile)) {
        return JSON.parse(fs.readFileSync(whitelistFile));
    }
    return [];
}

function writeWhitelist(list) {
    fs.writeFileSync(whitelistFile, JSON.stringify(list, null, 2));
    fs.writeFileSync(backupFile, JSON.stringify(list, null, 2)); // backup also
}

controllerBot.command('allow', (ctx) => {
    if (!isAdmin(ctx)) return ctx.reply("Access denied.");
    const parts = ctx.message.text.split(' ');
    const channelId = parts[1];
    if (!channelId) return ctx.reply("Please provide channel ID.");

    let whitelist = readWhitelist();
    if (!whitelist.includes(channelId)) {
        whitelist.push(channelId);
        writeWhitelist(whitelist);
        ctx.reply(`✅ Channel ${channelId} added to whitelist.`);
    } else {
        ctx.reply("Already whitelisted.");
    }
});

controllerBot.command('remove', (ctx) => {
    if (!isAdmin(ctx)) return ctx.reply("Access denied.");
    const parts = ctx.message.text.split(' ');
    const channelId = parts[1];
    if (!channelId) return ctx.reply("Please provide channel ID.");

    let whitelist = readWhitelist();
    if (whitelist.includes(channelId)) {
        whitelist = whitelist.filter(id => id !== channelId);
        writeWhitelist(whitelist);
        ctx.reply(`❌ Channel ${channelId} removed from whitelist.`);
    } else {
        ctx.reply("Channel not found in whitelist.");
    }
});

controllerBot.command('list', (ctx) => {
    if (!isAdmin(ctx)) return ctx.reply("Access denied.");
    const whitelist = readWhitelist();
    if (whitelist.length > 0) {
        ctx.reply("📋 Whitelisted Channels:\n" + whitelist.join("\n"));
    } else {
        ctx.reply("No whitelisted channels yet.");
    }
});

controllerBot.command('restore', (ctx) => {
    if (!isAdmin(ctx)) return ctx.reply("Access denied.");
    if (fs.existsSync(backupFile)) {
        const backup = JSON.parse(fs.readFileSync(backupFile));
        fs.writeFileSync(whitelistFile, JSON.stringify(backup, null, 2));
        ctx.reply("✅ Whitelist restored from backup.");
    } else {
        ctx.reply("⚠️ No backup found.");
    }
});

controllerBot.launch();
console.log("✅ Controller bot with multi-admin and backup is running...");
