import * as Prism from 'prismjs';
import { html as formatHTML } from 'js-beautify';

export function format(html?: string): string {
  return (
    html &&
    Prism.highlight(
      // eslint-disable-next-line @typescript-eslint/camelcase
      formatHTML(html, { indent_size: 2, unformatted: [] }),
      Prism.languages.html,
      'html',
    )
  );
}
