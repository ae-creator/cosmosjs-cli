import * as path from 'node:path';
import clc from 'cli-color';
import { commandBuilder } from '../helper/command-builder.helper';
import type { ICommand, ICommandList } from '../interfaces/command.interface';
import type { IOptions, IOptionsValue } from '../interfaces/option.interface';

/** is the command if no param ar given */
export default {
  name: 'default',
  run: async (argv: IOptionsValue[]) => {
    const version = argv.find((c) => c.option.includes('version') || c.option.includes('v'));
    let help = argv.find((c) => c.option.includes('help') || c.option.includes('h'));
    const commands = commandBuilder(path.join(__dirname, '../commands'));

    if (argv.length === 0) {
      help = {} as IOptionsValue;
    }

    if (version) {
      const packageFile = require(path.join(__dirname, '../../package.json'));
      console.log(clc.white(packageFile.version));
    }

    if (help) {
      const options: IOptions[] = [];
      const commandsTest: ICommandList[] = [];

      for (const command of commands) {
        if (command.options) {
          options.push(...command.options);
        }
        if (command.name !== 'default') {
          commandsTest.push({
            name: command.name,
            description: command.description,
          });
        }
      }
      console.log('Commands:');
      for (const command of commandsTest) {
        if (command.description) {
          console.log(`${clc.magenta(command.name)}   ${command.description}`);
        } else {
          console.log(`${clc.magenta(command.name)}`);
        }
      }
      console.log('\n Flags:');
      for (const option of options) {
        const alias = option.alias?.map((c) => `-${c}`);
        if (alias) {
          console.log(`${clc.blue(` ${alias} --${option.name}`)}`);
        } else {
          console.log(`${clc.blue(`--${option.name}`)}`);
        }
      }
    }
  },
  options: [
    {
      name: 'version',
      alias: ['v'],
    },
    {
      name: 'help',
      alias: ['h'],
    },
  ],
} as ICommand;
