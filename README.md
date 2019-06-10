# Deprecated!

Please use https://github.com/tonai/storybook-addon-themes.

# Storybook Addon Preview Theme

Storybook Addon Preview Theme can be used to apply a global theme (i.e. a CSS class) to the preview panel in [Storybook](https://storybook.js.org).

This addon supports every framework supported by Storybook that renders in a HTML document.

## Installation

```sh
npm i -D storybook-addons-preview-theme
```

## Configuration

Edit or create a file called `addons.js` in the Storybook config directory (by default, it’s `.storybook`).

Add following content to it:

```js
import 'storybook-addons-preview-theme/register';
```

## Usage

Write your stories like this:

```js
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withTheme } from 'storybook-addons-preview-theme';

storiesOf('Button', module)
  .addDecorator(withTheme)
  .addParameters({
    themes: [
      {
        name: 'dark',
        label: 'Dark',
        className: 'theme-dark',
      },
      {
        name: 'light',
        label: 'Light',
        className: 'theme-light',
      },
    ],
  })
  .add('with text', () => <button>Click me</button>);
```

This will show a new panel tab with a dropdown where users can select either the `Dark` or `Light` theme (or none by default).

**Note: Remember to always apply the `withTheme` decorator whenever you want to show a list of themes!**

### Setting up global themes

If your themes are defined globally to the project it could be easier to setup the addon once and just activate the tab whenever you need it.

To achieve that, add the themes to all stories with `addParameters` in `.storybook/config.js`:

```js
import { addParameters } from '@storybook/react'; // <- or your storybook framework

addParameters({
  globalThemes: [
    {
      name: 'dark',
      label: 'Dark',
      className: 'theme-dark',
    },
    {
      name: 'light',
      label: 'Light',
      className: 'theme-light',
    },
  ],
});
```

and then set the `themes` parameter on individual stories:

```diff
storiesOf('Button', module)
  .addDecorator(withTheme)
  .addParameters({
-    themes: [
-      {
-        name: 'dark',
-        label: 'Dark',
-        className: 'theme-dark',
-      },
-      {
-        name: 'light',
-        label: 'Light',
-        className: 'theme-light',
-      },
-    ],
+   themes: true,
  })
  .add('with text', () => <button>Click me</button>);
```

`themes` can be either `true` or an array of string containing a list of theme names you want to show in the panel:

```diff
storiesOf('Button', module)
  .addDecorator(withTheme)
  .addParameters({
-   themes: true,
+   themes: ['dark'], <-- User can just select the Dark theme
  })
  .add('with text', () => <button>Click me</button>);
```

Of course you can mix theme names and custom theme configuration objects for maximum flexibility:

```diff
storiesOf('Button', module)
  .addDecorator(withTheme)
  .addParameters({
-   themes: ['dark'],
+   themes: [
+     'dark', <-- theme defined in globalThemes
+     {
+       name: 'pink', <-- custom theme for this story
+       label: 'Pink',
+       className: 'theme-pink',
+     },
+   ],
  })
  .add('with text', () => <button>Click me</button>);
```

## Contributing

1.  Fork it or clone the repo
1.  Install dependencies `yarn install`
1.  Ensure everything is fine by running `yarn release`
1.  Push it or submit a pull request :D
