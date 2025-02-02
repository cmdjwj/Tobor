import { Context, NextFunction } from 'grammy';
import { Middleware } from '../types';
import { getCurrentTime, sendAdminMessage } from '../../../utils';

export const errorHandlerMiddleware: Middleware = {
    name: 'errorHandler',
    description: '错误处理中间件',
    execute: async (ctx: Context, next: NextFunction) => {
        try {
            await next();
        } catch (err) {
            console.error('错误:', err);
            await ctx.reply('抱歉，发生了一些错误');
            const errorMessage = `🚨 错误报告:\n\n时间：${getCurrentTime()}\n错误信息: \n${err}\n\n来自用户: ${ctx.from?.id}\n聊天ID: ${ctx.chat?.id}`;
            await sendAdminMessage(errorMessage);
        }
    }
};