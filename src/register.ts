import addons from '@storybook/addons';
import { createElement as h } from 'react';
import { Panel } from './components/Panel';

addons.register(`storybook-addon-storyout`, (api) => {
  addons.addPanel(`storybook-addon-storyout`, {
    title: 'HTML',
    render: ({ active, key }) =>
      h(Panel, {
        key,
        api,
        active,
      }),
  });
});
