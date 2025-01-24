import { webhookCallback } from "grammy";
import { setupBot } from '../src/bot';

const bot = setupBot();

export default webhookCallback(bot, "http");