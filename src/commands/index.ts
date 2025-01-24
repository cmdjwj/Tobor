import { Context } from 'grammy';
import { Command } from '../types';

export const commands: Command[] = [
    {
        command: 'start',
        description: '开始使用 Tobor',
        execute: async (ctx: Context) => {
            await ctx.reply('欢迎使用 Tobor！');
        }
    },
    {
        command: 'help',
        description: '获取帮助信息',
        execute: async (ctx: Context) => {
            const commandList = commands
                .map(cmd => `/${cmd.command} - ${cmd.description}`)
                .join('\n');
            await ctx.reply(`可用命令列表：\n${commandList}`);
        }
    },
    {
        command: 'echo',
        description: '复读你的消息',
        execute: async (ctx: Context) => {
            const input = ctx.message?.text || '';
            const message = input.startsWith('/echo') 
                ? (input.length > 5 ? input.slice(6).trim() : '请输入要复读的内容')
                : '请输入要复读的内容';
            await ctx.reply(message);
        }
    }
];