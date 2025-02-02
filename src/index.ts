import { Bot } from 'grammy';
import { getEnvConfig, buildBotConfig } from './config';
import { middlewares } from './modules/middlewares';
import { commands, commandList } from './modules/commands';
import { handlers } from './modules/handlers';
import { getCurrentTime, sendAdminMessage } from './utils';

const bot = setupBot();

function setupBot() {
    const env = getEnvConfig();
    const botConfig = buildBotConfig();
    const bot = new Bot(env.bot_token as string, botConfig);

    bot.catch((err) => {
        console.error('Bot 框架错误:', err);
        const errorMessage = `🚨 Bot框架错误:\n\n时间：${getCurrentTime()}\n错误信息：\n${err}`;
        sendAdminMessage(errorMessage, { silent: true }, bot);
    });

    middlewares.forEach(({ execute }) => {
        bot.use(execute);
    });

    commands.forEach(({ command, execute }) => {
        bot.command(command, execute);
    });

    bot.api.setMyCommands(commandList.map(
        ({ command, description }) => ({ command, description })
    ));

    handlers.forEach(({ event, callback }) => {
        bot.on(event, callback);
    });

    if (env.vercel_env) {
        sendAdminMessage('🚀 Bot已启动并成功部署！', { silent: true }, bot);
    }

    return bot;
}

export function getBot() {
    return bot;
}
