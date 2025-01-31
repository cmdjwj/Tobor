import { webhookCallback } from "grammy";
import { getBot } from '../src';

export default webhookCallback(getBot(), "http");