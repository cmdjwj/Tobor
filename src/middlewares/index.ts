import { Context, NextFunction } from 'grammy';

// 日志中间件
export const logger = async (ctx: Context, next: NextFunction) => {
    console.log(`Received update: ${JSON.stringify(ctx.update)}`);
    console.log(ctx.message);
    await next();
};

// 错误处理中间件
export const errorHandler = async (ctx: Context, next: NextFunction) => {
    try {
        await next();
    } catch (err) {
        console.error('错误:', err);
        await ctx.reply('抱歉，发生了一些错误');
    }
};

// // 权限检查中间件
// export const checkPermissions = async (ctx: Context, next: NextFunction) => {
//     // 在这里添加权限检查逻辑
//     const userId = ctx.from?.id;
//     if (userId) {
//         // 假设我们只允许特定用户
//         const allowedUserIds = [123456789]; // 替换为允许的用户 ID
//         if (allowedUserIds.includes(userId)) {
//             await next();
//         } else {
//             await ctx.reply('您没有权限执行此操作。');
//         }
//     } else {
//         await ctx.reply('无法识别用户。');
//     }
// };