import { Bot } from 'grammy';
import { getEnvConfig, getBotConfig } from '../config';
import { logger, errorHandler } from '../middlewares';
import { commands } from '../commands';
import { handlers } from '../handlers';

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

export function setupBot() {
    const env = getEnvConfig();
    const botConfig = getBotConfig();
    const bot = new Bot(env.bot_token as string, botConfig);

    // 处理未被捕获的框架错误
    bot.catch((err) => {
        console.error('Bot 框架错误:', err);
    });

    // 应用中间件
    bot.use(logger);
    bot.use(errorHandler);

    // 注册命令
    commands.forEach(({ command, execute }) => {
        bot.command(command, execute);
    });

    // 设置命令列表
    bot.api.setMyCommands(commands.map(({ command, description }) => ({
        command,
        description
    })));

    // 注册事件处理
    handlers.forEach(({ event, callback }) => {
        bot.on(event, callback);
    });

    // 设置 Webhook
    if (env.webhook_url) {
        setupWebhook(bot, env.webhook_url);
    }

    return bot;
}