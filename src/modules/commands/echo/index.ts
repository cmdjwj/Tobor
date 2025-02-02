import { Context } from "grammy";
import { Command } from "../types";

export const echoCommand: Command = {
    command: 'echo',
    description: '复读你的消息',
    execute: async (ctx: Context) => {
        const message = ctx.message?.text?.trim().slice(5).trim() || '请输入要复读的内容';
        await ctx.reply(message);
    }
};