import { Context } from "grammy";
import { Command } from "../types";

export const echoCommand: Command = {
    command: 'echo',
    description: '复读你的消息',
    execute: async (ctx: Context) => {
        const input = ctx.message?.text || '';
        const message = input.startsWith('/echo') 
            ? (input.length > 5 ? input.slice(6).trim() : '请输入要复读的内容')
            : '请输入要复读的内容';
        await ctx.reply(message);
    }
};