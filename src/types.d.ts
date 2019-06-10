export type fn = (...args: any) => any;
export type renderFn = (output: any) => Element;

export interface Parameters {
  transform?: (input: Element) => Element;
  match?: string;
  render?: renderFn;
  [key: string]: any;
}

export interface DecoratorParams {
  parameters: Parameters | false;
}
