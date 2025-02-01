import { Context, FilterQuery } from 'grammy';

export interface Handler {
    event: FilterQuery;
    description: string;
    callback: (ctx: Context) => Promise<void>;
}