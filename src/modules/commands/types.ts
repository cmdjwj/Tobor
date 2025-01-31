import { Context } from 'grammy';

export interface Command {
    command: string;
    description: string;
    execute: (ctx: Context) => Promise<void>;
}