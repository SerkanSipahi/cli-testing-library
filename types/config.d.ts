import {TestInstance} from "./pure";

export interface Config {
  testIdAttribute: string
  /**
   * WARNING: `unstable` prefix means this API may change in patch and minor releases.
   * @param cb
   */
  unstable_advanceTimersWrapper(cb: (...args: unknown[]) => unknown): unknown
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  asyncWrapper(cb: (...args: any[]) => any): Promise<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  eventWrapper(cb: (...args: any[]) => any): void
  asyncUtilTimeout: number
  errorDebounceTimeout: number
  computedStyleSupportsPseudoElements: boolean
  defaultHidden: boolean
  showOriginalStackTrace: boolean
  throwSuggestions: boolean
  getInstanceError: (message: string | null, container: TestInstance) => Error
}

export interface ConfigFn {
  (existingConfig: Config): Partial<Config>
}

export function configure(configDelta: ConfigFn | Partial<Config>): void
export function getConfig(): Config
