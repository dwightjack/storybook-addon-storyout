import { Parameters, renderFn } from '../types';

export function renderer(defaults: Partial<Parameters> = {}): renderFn {
  return function custom(
    output: unknown,
    parameters: Partial<Parameters> = {},
  ): ReturnType<renderFn> {
    const { transform, stringify } = { ...defaults, ...parameters };
    let el = output;

    if (typeof transform === 'function') {
      el = transform(el);
    }

    if (typeof stringify !== 'function') {
      throw new TypeError('"stringify" should be a function');
    }

    return stringify(el);
  };
}
