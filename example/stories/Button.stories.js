import { withSource, html } from '../../index.m';

const render = html(); // <-- initialize the html renderer

export default {
  title: 'Button',
  decorators: [withSource],
  parameters: {
    source: { render },
  },
};

export const DefaultButton = () => '<button>Click me</button>';
