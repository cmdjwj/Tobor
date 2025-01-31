import { Bot } from 'grammy';
import { getEnvConfig, getBotConfig } from '../config';
import { logger, errorHandler } from '../middlewares';
import { commands } from '../commands';
import { handlers } from '../handlers';

const bot = setupBot();

function setupBot() {
    const env = getEnvConfig();
    const botConfig = getBotConfig();
    const bot = new Bot(env.bot_token as string, botConfig);

    bot.catch((err) => {
        console.error('Bot 框架错误:', err);
    });

    bot.use(logger);
    bot.use(errorHandler);

    commands.forEach(({ command, execute }) => {
        bot.command(command, execute);
    });

    bot.api.setMyCommands(commands.map(({ command, description }) => ({
        command,
        description
    })));

    handlers.forEach(({ event, callback }) => {
        bot.on(event, callback);
    });

    return bot;
}

export function getBot() {
    return bot;
}