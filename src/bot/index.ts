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

    if (env.webhook_url) {
        setupWebhook(bot, env.webhook_url);
    }

    return bot;
}

async function setupWebhook(bot: Bot, webhookUrl: string) {
    try {
        await bot.api.deleteWebhook();
        await bot.api.setWebhook(webhookUrl);
        console.log('Webhook设置成功:', webhookUrl);
    } catch (error) {
        console.error('Webhook设置失败:', error);
        throw error;
    }
}

export function getBot() {
    return bot;
}

export function getBot() {
    return bot;
}