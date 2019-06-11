import { html as formatHTML } from 'js-beautify';

export function isElement(v: any): v is Element {
  return v && v.nodeType === 1;
}

export function format(source?: string): string {
  // eslint-disable-next-line @typescript-eslint/camelcase
  return formatHTML(source, { indent_size: 2, unformatted: [] });
}
