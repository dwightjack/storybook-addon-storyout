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
    if (parameters === false) {
      return getStory(context);
    }

    const { transform, match, render } = parameters;

    if (typeof render !== 'function') {
      throw new TypeError('You need to provide a render function');
    }

    const channel = addons.getChannel();

    const result = render(getStory(context));
    let output = result;

    if (typeof match === 'string' && !output.matches(match)) {
      output = output.querySelector(match);
    }

    if (typeof transform === 'function') {
      output = transform(output);
    }

    channel.emit(UPDATE_SOURCE, { output: output.outerHTML });

    return output;
  },
});
