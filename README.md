# Storybook Addon StoryOut

Storybook Addon StoryOut adds a tab panel that lets you visualize and copy the output of a story.

This addon con be configured to be used in every framework supported by Storybook.

## Installation

```sh
npm i -D storybook-addon-storyout
```

## Configuration

Edit or create a file called `addons.js` in the Storybook config directory (by default, it’s `.storybook`).

Add following content to it:

```js
import 'storybook-addon-storyout/register';
```

## Usage

### With `@storybook/html`

Write your stories like this:

```js
import { storiesOf } from '@storybook/react';
import { withSource, html } from 'storybook-addon-storyout';

const render = html(); // <-- initialize the html renderer

storiesOf('Button', module)
  .addDecorator(withTheme)
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
import { storiesOf } from '@storybook/react';
import { withSource, custom } from 'storybook-addon-storyout';

const outputRender = custom({
  stringify: (node) => ReactDOMServer.renderToStaticMarkup(node),
});

storiesOf('Button', module)
  .addDecorator(withTheme)
  .addParameters({
    source: { render: outputRender },
  })
  .add('with text', () => <button>Click me</button>);
```

### Global configuration

If your want to show the source panel on every story you can cofigure it globally in `.storybook/config.js`:

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

To disable the source panel in a specific story set its `source` parameter to `false`.

```js
storiesOf('Button', module).add(
  'without source',
  () => '<button>Click me</button>',
  { source: false },
);
```

### `source` Parameter configuration

The `source` parameter accepts the following properties:

#### `language: string` (optional)

The highlight language in use. Defaults to `html`.

#### `render(story: any, parameters: object): string`

A function receiving the story output and a parameters object. Parameter object contains the `transform` and `stringify` functions and the `language` string.

#### `stringify(node: any): string` (optional)

A function receiving the story output (in `@storybook/html` it might be a string or a DOM element) and returning its source as string.

**Note**: This function is already defined in the `html` renderer but can be overridden if needed.

#### `transform(node: any): any` (optional)

A function receiving the story output and returning it after an arbitrary transformation.

### Default configuration

Both the `custom` and the `hmtl` renderer accept the same `source` parameters. Passed-in values will be used as defaults.

## Contributing

1.  Fork it or clone the repo
1.  Install dependencies `yarn install`
1.  Ensure everything is fine by running `yarn release`
1.  Push it or submit a pull request :D
