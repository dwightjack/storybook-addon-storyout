import { html as formatHTML } from 'js-beautify';

export function isElement(v: unknown): v is Element {
  return v && (v as Element).nodeType === 1;
}

export function format(source?: string): string {
  // eslint-disable-next-line @typescript-eslint/camelcase
  return source ? formatHTML(source, { indent_size: 2, unformatted: [] }) : '';
}

export function toDOM(str: string): Element | null {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = str;
  return wrapper.firstElementChild;
}

export const toString = (el: Element): string => el.outerHTML;
