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
  /** if currentArgv has 1 or 2 '--' at the begining */
  const hasOneOrTwoHyphens = /^-{1,2}\d+/;
  for (let i = 1; i < argv.length; i++) {
    const currentArgv = argv[i];
    if (currentArgv.match(hasOneOrTwoHyphens)) {
      options.push(currentArgv);
    } else {
      /** If last argv was a option then bind this as a value for the option */
      if (argv[i - 1].match(hasOneOrTwoHyphens)) {
        // TODO
      } else {
        currentCommand = currentArgv;
      }
    }
  }

  const exec = commands.find((command) => command.name === currentCommand || command.alias?.includes(currentCommand));
  if (exec !== undefined) {
    exec.run();
  }
} else {
  runCli();
}
