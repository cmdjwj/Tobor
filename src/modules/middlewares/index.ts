import { Middleware } from './types';
import { loggerMiddleware } from './logger';
import { errorHandlerMiddleware } from './errorHandler';

export const middlewares: Middleware[] = [
    loggerMiddleware,
    errorHandlerMiddleware
];

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