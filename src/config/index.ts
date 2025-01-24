import { config } from 'dotenv';
import { HttpsProxyAgent } from 'https-proxy-agent';

config();

export function getEnvConfig() {
    const env = {
        bot_token: process.env.BOT_TOKEN,
        use_proxy: process.env.USE_PROXY === 'true',
        proxy_host: process.env.PROXY_HOST,
        proxy_port: process.env.PROXY_PORT,
    }
    if (!env.bot_token) {
        throw new Error('BOT_TOKEN 未在环境变量中设置！请在 .env 文件中设置 BOT_TOKEN');
    }
    if (env.use_proxy && (!env.proxy_host || !env.proxy_port)) {
        throw new Error('使用代理时，PROXY_HOST 和 PROXY_PORT 必须同时设置！');
    }
    return env;
}

export function getBotConfig() {
    const env = getEnvConfig();
    let botConfig = {};
    if (env.use_proxy && env.proxy_host && env.proxy_port) {
        console.log(`使用代理: ${env.proxy_host}:${env.proxy_port}`);
        const agent = new HttpsProxyAgent(`http://${env.proxy_host}:${env.proxy_port}`);
        botConfig = {
            client: {
                baseFetchConfig: {
                    agent,
                },
            },
        };
    }
    return botConfig;
}
