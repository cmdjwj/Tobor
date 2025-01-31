import { webhookCallback } from "grammy";
import { getBot } from '../src/bot';

export default webhookCallback(getBot(), "http");