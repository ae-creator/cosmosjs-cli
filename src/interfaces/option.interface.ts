export interface IOptions {
  /** Option name */
  name: string;
  /** Array of possible alias */
  alias?: string[];
  /** Runner of option */
  run?: () => Promise<any>;
}
