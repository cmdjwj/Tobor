import { Context } from "grammy";
import { Handler } from "../types";

export const exampleHandler: Handler = {
    event: "message:sticker",
    description: '处理贴纸消息',
    callback: async (ctx: Context) => {
        await ctx.reply('收到您的贴纸');
    }
};