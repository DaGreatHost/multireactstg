# Multi Telegram Auto-Reaction Bots

This project launches 20 Telegram bots that auto-react to channel posts using random emojis.

## 📦 Features
- 20 bots running in one process
- Auto-react to any post in channels they are admins of
- Random emoji reaction per post

## 🛠 How to Use Locally
1. Install dependencies
   ```
   npm install
   ```

2. Create a `.env` file or use the one included
   ```
   BOT1_TOKEN=your_token_here
   ...
   BOT20_TOKEN=your_token_here
   ```

3. Run the bots
   ```
   node index.js
   ```

## 🚀 Deployment on Railway
1. Push this project to a GitHub repo
2. Create a Railway project > "Deploy from GitHub"
3. Add all 20 BOTx_TOKENs in the Environment tab
4. Click "Deploy"

---

If the bot is not reacting, make sure:
- The bot is an admin in the target channel
- The bot has the permission to react to messages
- You are using Telegram Bot API v6.7+

Enjoy your auto-reaction swarm! 🚀
