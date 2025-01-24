import { setupBot } from './src/bot';

const bot = setupBot();

bot.start({
    onStart: (botInfo) => {
        console.log(`Bot 已启动! 用户名: @${botInfo.username}`);
    },
});