import { Context } from 'grammy';
import { Handler } from '../types';

export const handlers: Handler[] = [
    {
        event: "message:text",
        description: '处理文本消息',
        callback: async (ctx: Context) => {
            console.log('收到消息:', ctx.message);
            if (!ctx.message?.text) return;
            await ctx.reply('您发送了文本消息: ' + ctx.message.text);
        }
    },
    {
        event: "message:photo",
        description: '处理图片消息',
        callback: async (ctx: Context) => {
            console.log('收到消息:', ctx.message);
            await ctx.reply('收到您的图片');
        }
    },
    {
        event: "message:sticker",
        description: '处理贴纸消息',
        callback: async (ctx: Context) => {
            console.log('收到消息:', ctx.message);
            await ctx.reply('收到您的贴纸');
        }
    }
];
