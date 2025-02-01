import { Context, NextFunction } from "grammy";
import { Middleware } from "../types";

export const loggerMiddleware: Middleware = {
    name: 'logger',
    description: '日志记录中间件',
    execute: async (ctx: Context, next: NextFunction) => {
        console.log(`Received update: ${JSON.stringify(ctx.update)}`);
        console.log(ctx.message);
        await next();
    }
};