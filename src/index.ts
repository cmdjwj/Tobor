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

    if (env.webhook_url && process.env.VERCEL === '1') {
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
