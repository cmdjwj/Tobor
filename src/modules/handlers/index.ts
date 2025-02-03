import { Handler } from './types';
import { chatLlmHandler } from './chat_llm';

export const handlers: Handler[] = [
    chatLlmHandler
];
