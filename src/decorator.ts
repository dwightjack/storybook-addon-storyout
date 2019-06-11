import addons, {
  makeDecorator,
  StoryGetter,
  StoryContext,
} from '@storybook/addons';

import { DecoratorParams } from './types';

import { UPDATE_SOURCE } from './constants';

export const withSource = makeDecorator({
  name: 'withSource',
  parameterName: 'source',
  skipIfNoParametersOrOptions: false,
  wrapper(
    getStory: StoryGetter,
    context: StoryContext,
    { parameters = {} }: DecoratorParams,
  ) {
    const output = getStory(context);

    if (parameters === false) {
      return output;
    }

    const { render, ...rest } = parameters;

    if (typeof render !== 'function') {
      throw new TypeError('You need to provide a render function');
    }

    const channel = addons.getChannel();

    const source = render(output, rest);

    channel.emit(UPDATE_SOURCE, {
      source,
      language: parameters.language || 'html',
    });

    return output;
  },
});
