import { Bot } from 'grammy';
import { getEnvConfig, buildBotConfig } from './config';
import { middlewares } from './modules/middlewares';
import { commands, commandList } from './modules/commands';
import { handlers } from './modules/handlers';

const bot = setupBot();

function setupBot() {
    const env = getEnvConfig();
    const botConfig = buildBotConfig();
    const bot = new Bot(env.bot_token as string, botConfig);

    bot.catch((err) => {
        console.error('Bot 框架错误:', err);
    });

    middlewares.forEach(({ execute }) => {
        bot.use(execute);
    });

    commands.forEach(({ command, execute }) => {
        bot.command(command, execute);
    });

    bot.api.setMyCommands(commandList.map(({ command, description }) => ({
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
