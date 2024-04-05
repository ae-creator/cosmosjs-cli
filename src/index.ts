import { select } from '@inquirer/prompts';
import * as commands from './commands';
async function runCli() {
  // ! Value should always match the exported function name from commands/index.ts
  const selectedCommand = await select({
    message: 'Select options',
    choices: [
      {
        name: 'init',
        description: 'init your application',
        value: 'init',
      },
    ],
  });

  const command = commands[selectedCommand as keyof typeof commands];
  await command();
}

runCli();
