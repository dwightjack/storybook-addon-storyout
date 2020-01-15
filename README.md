# Storybook Addon StoryOut

Storybook Addon StoryOut adds a tab panel that lets you visualize and copy the output of a story.

This addon con be configured to be used in every framework supported by Storybook.

## Installation

```sh
npm i -D storybook-addon-storyout
```

## Configuration

### Storybook 5.3 and newer

1. Edit or create a file called `main.js` in the Storybook config directory (by default, it’s `.storybook`).
2. Add the addon to the `addons` array:

```js
module.exports = {
  // ...other configs here
  addons: ['storybook-addon-storyout/register'],
};
```

### Storybook <=5.2

Edit or create a file called `addons.js` in the Storybook config directory (by default, it’s `.storybook`).

Add following content to it:

```js
import 'storybook-addon-storyout/register';
```

## Usage

### With `@storybook/html`

Write your stories like this (uses [CSF](https://storybook.js.org/docs/formats/component-story-format/)):

```js
import { withSource, html } from 'storybook-addon-storyout';

const render = html(); // <-- initialize the html renderer

export default {
  title: 'Button',
  decorators: [withSource],
  parameters: {
    source: { render },
  },
};

export const DefaultButton = () => '<button>Click me</button>';
```

Or, with the [storiesOf API](https://storybook.js.org/docs/formats/storiesof-api/):

```js
import { storiesOf } from '@storybook/react';
import { withSource, html } from 'storybook-addon-storyout';

const render = html(); // <-- initialize the html renderer

storiesOf('Button', module)
  .addDecorator(withSource)
  .addParameters({
    source: { render },
  })
  .add('default button', () => '<button>Click me</button>');
```

This will show a new panel tab with the highlighted HTML output.

### With another framework

With frameworks like React or Vue.js you can leverage the custom renderer and provide a custom render function returning an HTML string.

For example, with React write your stories like this:

```js
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { withSource, custom } from 'storybook-addon-storyout';

const render = custom({
  stringify: (node) => ReactDOMServer.renderToStaticMarkup(node),
});

export default {
  title: 'Button',
  decorators: [withSource],
  parameters: {
    source: { render },
  },
};

export const WithText = () => <button>Click me</button>;
```

### Global configuration

If your want to show the source panel on every story you can configure it globally in `.storybook/preview.js` (`.storybook/config.js` for Storybook <= 5.2):

```js
import { addParameters, addDecorator } from '@storybook/html'; // <- or your storybook framework
import { withSource, html } from 'storybook-addon-storyout';

addParameters({
  source: {
    render: html(),
  },
});
addDecorator(withSource);
```

To disable the source panel in a specific story set its `source.render` parameter to `false`.

```js
export const WithoutSource = () => '<button>Click me</button>';

WithSource.story = {
  parameters: { source: { render: false } },
};
```

### `source` Parameter configuration

The `source` parameter accepts the following properties:

| name      | type     | default  | description                                                                                                                |
| --------- | -------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| language  | string   | `'html'` | The highlight language in use                                                                                              |
| render    | function |          | Outputs the HTML to display (see below)                                                                                    |
| stringify | function | (1)      | Receives the story output (in `@storybook/html` it might be a string or a DOM element) and returning its source as string. |
| transform | function | (2)      | Receives the story output and returning it after an arbitrary transformation.                                              |

1. This function is already defined in the `html` renderer but can be overridden if needed.

### The `render` function

The render function has the following signature:

```ts
render(storyOutput: unknown, parameters: object): string
```

It receives the story output and a parameters object. Parameter object contains the `transform` and `stringify` functions and the `language` string.

### Default configuration

Both the `custom` and the `html` renderer accept the same `source` parameters. Passed-in values will be used as defaults.

## Contributing

1.  Fork it or clone the repo
1.  Install dependencies `yarn install`
1.  Ensure everything is fine by running `yarn release`
1.  Push it or submit a pull request :D
