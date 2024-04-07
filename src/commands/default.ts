import type { ICommand } from '../interfaces/command.interface';

/** is the command if no param ar given */
export default {
  name: 'default',
  run: async (argv) => {
    console.log(argv);
  },
  options: [
    {
      name: 'version',
      alias: ['v'],
    },
  ],
} as ICommand;
