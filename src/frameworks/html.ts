import { isElement, toDOM, toString } from '../utils';
import { Parameters, renderFn } from '../types';

export function renderer(defaults: Partial<Parameters> = {}): renderFn {
  return function html(
    output: unknown,
    parameters: Partial<Parameters> = {},
  ): ReturnType<renderFn> {
    const { transform, stringify = toString } = { ...defaults, ...parameters };
    let el = typeof output === 'string' ? toDOM(output) : output;

    if (isElement(el) === false) {
      throw new TypeError(
        'Invalid story output format. Supported formats: string, DOM Element',
      );
    }

    if (typeof transform === 'function') {
      el = transform(el);
    }

    return stringify(el as Element);
  };
}
