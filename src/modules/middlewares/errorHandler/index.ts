import { Context, NextFunction } from 'grammy';
import { Middleware } from '../types';

export const errorHandlerMiddleware: Middleware = {
    name: 'errorHandler',
    description: '错误处理中间件',
    execute: async (ctx: Context, next: NextFunction) => {
        try {
            await next();
        } catch (err) {
            console.error('错误:', err);
            await ctx.reply('抱歉，发生了一些错误');
        }
    }
};