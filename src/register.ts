import addons from '@storybook/addons';
import { createElement as h, ReactElement } from 'react';
import { Panel } from './components/Panel';

addons.register(`storybook-addon-storyout`, (api): void => {
  addons.addPanel(`storybook-addon-storyout`, {
    title: 'HTML',
    render: ({ active, key }): ReactElement =>
      h(Panel, {
        key,
        api,
        active,
      }),
  });
});
