import { isElement } from '../utils';
import { Parameters, renderFn } from '../types';

function toDOM(str: string): Element {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = str;
  return wrapper.firstElementChild;
}

const toString = (el: Element): string => el.outerHTML;

export function renderer(defaults: Partial<Parameters> = {}): renderFn {
  return function html(
    output: Element | string,
    parameters: Partial<Parameters> = {},
  ) {
    const { transform, stringify = toString } = { ...defaults, ...parameters };
    let el = typeof output === 'string' ? toDOM(output) : output;

    if (!isElement(el)) {
      throw new TypeError(
        'Invalid story output format. Supported formats: string, DOM Element',
      );
    }

    if (typeof transform === 'function') {
      el = transform(el);
    }

    return stringify(el);
  };
}
