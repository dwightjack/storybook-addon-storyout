export type fn = (...args: any) => any;
export type transformFn = <T>(input: T) => T;
export type stringifyFn = (input: any, ...args: any[]) => string;
export type renderFn = (
  input: any,
  parameters?: Pick<Parameters, 'transform' | 'stringify' | 'language'>,
) => string;

export interface Parameters {
  transform?: transformFn;
  stringify?: stringifyFn;
  render?: renderFn;
  language?: string;
  [key: string]: any;
}

export interface DecoratorParams {
  parameters: Parameters | false;
}
