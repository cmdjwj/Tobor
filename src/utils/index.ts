import { Bot } from 'grammy';
import { getEnvConfig } from '../config';
import { getBot } from '..';

export const formatDate = (date: Date): string => {
    return date.toISOString();
};

export const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const getCurrentTime = (): string => {
    const now = new Date();
    return now.toLocaleString('zh-CN', { 
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
};

export const sendAdminMessage = async (
    message: string, 
    options: { silent?: boolean } = {},
    bot: Bot = getBot()
): Promise<void> => {
    const { admin_id } = getEnvConfig();
    if (!admin_id) {
        console.warn('未设置管理员ID，无法发送管理员消息');
        return;
    }
    try {
        await bot.api.sendMessage(admin_id, message, {
            disable_notification: options.silent
        });
    } catch (error) {
        console.error('发送管理员消息失败:', error);
    }
};