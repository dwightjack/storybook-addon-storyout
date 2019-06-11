import { Parameters, renderFn } from '../types';

export function renderer(defaults: Partial<Parameters> = {}): renderFn {
  return function custom(output: any, parameters: Partial<Parameters> = {}) {
    const { transform, stringify } = { ...defaults, ...parameters };
    let el = output;

    if (typeof transform === 'function') {
      el = transform(el);
    }

    return stringify(el);
  };
}
