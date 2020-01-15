export type fn = (...args: unknown[]) => unknown;
export type transformFn = <T>(input: T) => T;
export type stringifyFn = (input: unknown, ...args: unknown[]) => string;
export type renderFn = (
  output: unknown,
  parameters?: Pick<Parameters, 'transform' | 'stringify' | 'language'>,
) => string;

export interface Parameters {
  transform?: transformFn;
  stringify?: stringifyFn;
  render?: renderFn | false;
  language?: string;
  [key: string]: unknown;
}

export interface SourceUpdateEvent {
  source: string;
  language: string;
}
