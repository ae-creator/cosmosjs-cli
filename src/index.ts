import * as path from 'node:path';
import { commandBuilder } from './helper/command-builder.helper';
import type { IOptionsValue } from './interfaces/option.interface';

const argv = process.argv;
const commands = commandBuilder(path.join(__dirname, 'commands'));
let currentCommand = 'default';
const options: IOptionsValue[] = [];
/** if currentArgv has 1 or 2 '--' at the begining */
const hasOneOrTwoHyphens = /^-{1,2}[a-zA-Z]+$/;
for (let i = 2; i < argv.length; i++) {
  const currentArgv = argv[i];
  if (hasOneOrTwoHyphens.test(currentArgv)) {
    options.push({
      option: currentArgv,
    });
  } else {
    /** If last argv was a option then bind this as a value for the option */
    if (hasOneOrTwoHyphens.test(argv[i - 1])) {
      const lastOption = options.find((o) => o.option === argv[i - 1]);
      if (lastOption) {
        lastOption.value = currentArgv;
      }
    } else {
      /** You can only have on command at the entry */
      if (currentCommand === 'default') {
        currentCommand = currentArgv;
      }
    }
  }
}

const exec = commands.find((command) => command.name === currentCommand || command.alias?.includes(currentCommand));
if (exec !== undefined) {
  exec.run(options);
}
