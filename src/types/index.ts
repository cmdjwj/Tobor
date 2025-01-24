import { Context, FilterQuery } from 'grammy';

export interface Command {
    command: string;
    description: string;
    execute: (ctx: Context) => Promise<void>;
}

export interface Handler {
    event: FilterQuery;
    description: string;
    callback: (ctx: Context) => Promise<void>;
}
