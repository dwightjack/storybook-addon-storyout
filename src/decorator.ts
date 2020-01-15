import addons, {
  makeDecorator,
  StoryGetter,
  StoryContext,
  StoryWrapper,
  WrapperSettings,
} from '@storybook/addons';

import { UPDATE_SOURCE } from './constants';

export function decoratorWrapper(
  getStory: StoryGetter,
  context: StoryContext,
  { parameters = {} }: WrapperSettings,
): ReturnType<StoryWrapper> {
  const output = getStory(context);

  if ((parameters as unknown) === false) {
    console.warn(
      `Setting the "source" parameter to false is deprecated. Use { render: false } instead.`,
    );
    return output;
  }

  if (!parameters.render) {
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
}

export const withSource = makeDecorator({
  name: 'withSource',
  parameterName: 'source',
  skipIfNoParametersOrOptions: false,
  wrapper: decoratorWrapper,
});
