import { Context, NextFunction } from "grammy";

export interface Middleware {
    name: string;
    description: string; 
    execute: (ctx: Context, next: NextFunction) => Promise<void>;
}