import * as util from 'node:util';
import type { ICommand } from '../interfaces/command.interface';
const exec = util.promisify(require('node:child_process').exec);

// export async function init() {
//   const packageName = await input({ message: 'package name' });
//   const outFolder = await input({ message: 'folder output', default: '.' });
//   const templateLink = 'github.com/ae-creator/cosmosjs-core-template';
//   const packageFileName = 'package.json';

//   try {
//     await exec(`bun create ${templateLink}  ${outFolder}`);
//     await delay(1000);
//     const packageFile = require(path.join(__dirname, `${outFolder}/${packageFileName}`));
//     packageFile.name = packageName;
//   } catch (error) {
//     console.error(error);
//   }
// }

export default {
  name: 'init',
  alias: ['i'],
  run: async () => {
    console.log('init');
  },
} as ICommand;
