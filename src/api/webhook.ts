import { webhookCallback } from "grammy";
import { setupBot } from '../bot';

const bot = setupBot();

export default webhookCallback(bot, "http");