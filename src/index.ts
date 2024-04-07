import * as path from 'node:path';
import { select } from '@inquirer/prompts';
import { commandBuilder } from './helper/command-build.helper';

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

  // const command = commands[selectedCommand as keyof typeof commands];
  // await command();
}

/** If 1 argument is passed */
const argv = process.argv;
console.log(argv);
if (argv.length > 2) {
  const commands = commandBuilder(path.join(__dirname, 'commands'));
  let currentCommand = 'default';
  const options: string[] = [];
  for (let i = 1; i < argv.length; i++) {
    const currentArgv = argv[i];
    /** if currentArgv has 1 or 2 '--' at the begining */
    if (currentArgv.match(/^-{1,2}\d+/)) {
      options.push(currentArgv);
    } else {
      currentCommand = currentArgv;
    }
  }

  const exec = commands.find((command) => command.name === currentCommand || command.alias?.includes(currentCommand));
  if (exec !== undefined) {
    exec.run();
  }
} else {
  runCli();
}
