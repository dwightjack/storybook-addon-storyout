import { addons, types } from '@storybook/addons';
import { createElement as h, ReactElement } from 'react';
import { Panel } from './components/Panel';
import { PANEL_ID, PARAM_KEY } from './constants';

addons.register(PANEL_ID, (api): void => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'HTML',
    paramKey: PARAM_KEY,
    render: ({ active, key }): ReactElement =>
      h(Panel, {
        key,
        api,
        active,
      }),
  });
});
