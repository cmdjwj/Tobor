import { Context } from 'grammy';
import { Command } from '../types';

export const startCommand: Command = {
    command: 'start',
    description: '开始使用 Tobor',
    execute: async (ctx: Context) => {
        await ctx.reply('欢迎使用 Tobor！');
    }
};