import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';

// 加载环境变量
function loadEnv(): void {
    const result = dotenv.config();
    if (result.error) {
        console.error('错误: .env 文件不存在');
        process.exit(1);
    }
}

// 检查必需的环境变量
function checkEnv(): void {
    if (!process.env.BOT_TOKEN) {
        console.error('错误: 请在 .env 文件中设置 BOT_TOKEN');
        process.exit(1);
    }
    if (!process.env.WEBHOOK_URL) {
        console.error('错误: 请在 .env 文件中设置 WEBHOOK_URL');
        process.exit(1);
    }
}

// 构建fetch选项
function buildFetchOptions(): any {
    const options: any = {};
    if (process.env.USE_PROXY === 'true') {
        const proxyUrl = `http://${process.env.PROXY_HOST}:${process.env.PROXY_PORT}`;
        options.agent = new HttpsProxyAgent(proxyUrl);
    }
    return options;
}

// 设置webhook
async function setupWebhook(): Promise<void> {
    console.log('正在设置 webhook...');
    const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/setWebhook?url=${process.env.WEBHOOK_URL}`;
    const response = await fetch(url, buildFetchOptions());
    const data = await response.json();
    console.log(data);
}

// 获取webhook信息
async function getWebhookInfo(): Promise<void> {
    console.log('正在获取 webhook 信息...');
    const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/getWebhookInfo`;
    const response = await fetch(url, buildFetchOptions());
    const data = await response.json();
    console.log(data);
}

// 主函数
async function main(): Promise<void> {
    loadEnv();
    checkEnv();
    await setupWebhook();
    await getWebhookInfo();
}

main().catch(console.error);