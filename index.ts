import { getBot } from './src/bot';

getBot().start({
    onStart: (botInfo) => {
        console.log(`Bot 已启动! 用户名: @${botInfo.username}`);
    },
});