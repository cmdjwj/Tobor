import { Command } from './types';
import { startCommand } from './start';
import { helpCommand } from './help';
import { echoCommand } from './echo';

export const commands: Command[] = [
    startCommand,
    helpCommand,
    echoCommand
];

export const commandList: Command[] = [
    startCommand,
    helpCommand,
    echoCommand
];