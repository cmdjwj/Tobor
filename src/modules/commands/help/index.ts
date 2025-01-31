import { Context } from 'grammy';
import { Command } from '../types';
import { commands } from '../index';

export const helpCommand: Command = {
    command: 'help',
    description: '获取帮助信息',
    execute: async (ctx: Context) => {
        const commandList = commands
            .map(cmd => `/${cmd.command} - ${cmd.description}`)
            .join('\n');
        await ctx.reply(`可用命令列表：\n${commandList}`);
    }
}