import type { IOptions } from './option.interface';
type GenericObject = { [key: string]: any };

export interface ICommand {
  /** Array of possible alias */
  alias?: string[];
  /** Command name */
  name: string;
  /** Options of command */
  options?: IOptions[];
  /** Runner of command */
  run: (args?: GenericObject) => Promise<any>;
  /** Sub command */
  subCommandRunner?: ICommand[];
}
