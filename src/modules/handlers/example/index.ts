import { Context } from "grammy";
import { Handler } from "../types";

export const exampleHandler: Handler = {
    event: "message:sticker",
    description: '处理贴纸消息',
    callback: async (ctx: Context) => {
        const sticker = ctx.message?.sticker;
        if (sticker) await ctx.replyWithSticker(sticker.file_id);
    }
};