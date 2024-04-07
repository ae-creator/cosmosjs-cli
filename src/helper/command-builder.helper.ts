import fs from 'node:fs';
import path from 'node:path';
import type { ICommand } from '../interfaces/command.interface';

/** Will read all file from a folder get the default export and return them into an arrays */
export function commandBuilder(folderPath: string): ICommand[] {
  const files = fs.readdirSync(folderPath);
  const defaultExports: ICommand[] = [];

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      const moduleExports = require(filePath);
      if (moduleExports.default) {
        defaultExports.push(moduleExports.default);
      }
    }
  }

  return defaultExports;
}
