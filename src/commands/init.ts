import * as path from 'node:path';
import * as util from 'node:util';
import { input } from '@inquirer/prompts';
import type { ICommand } from '../interfaces/command.interface';
import { delay } from '../utils/delay';
const exec = util.promisify(require('node:child_process').exec);

export async function init() {
  const packageName = await input({ message: 'package name' });
  const outFolder = await input({ message: 'folder output', default: '.' });
  const templateLink = 'github.com/ae-creator/cosmosjs-core-template';
  const packageFileName = 'package.json';

  try {
    await exec(`bun create ${templateLink}  ${outFolder}`);
    await delay(1000);
    const packageFile = require(path.join(__dirname, `${outFolder}/${packageFileName}`));
    packageFile.name = packageName;
  } catch (error) {
    console.error(error);
  }
}

export default {
  name: 'init',
  alias: ['i'],
  description: 'Start an empty project from a blank template',
  run: init,
} as ICommand;
