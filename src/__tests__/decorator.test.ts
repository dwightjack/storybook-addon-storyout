import * as addons from '@storybook/addons';
import { UPDATE_SOURCE } from '../constants';

jest.mock('@storybook/addons');

describe('Addon Decorator', () => {
  let withSource: addons.MakeDecoratorResult;
  let onSpy: jest.SpyInstance;
  const context = {} as addons.StoryContext;
  beforeEach(() => {
    onSpy = jest.fn();
    (addons.makeDecorator as jest.Mock).mockImplementation(<T>(v: T): T => v);
    (addons.default.getChannel as jest.Mock).mockImplementation(
      (): unknown => ({
        on: onSpy,
      }),
    );
    ({ withSource } = require('../decorator'));
  });
  test('returns a decorator', () => {
    expect(addons.makeDecorator).toHaveBeenCalled();
  });
  test('decorator props', () => {
    expect(withSource).toEqual({
      name: 'withSource',
      parameterName: 'source',
      skipIfNoParametersOrOptions: false,
      wrapper: expect.any(Function),
    });
  });
  describe('wrapper function', () => {
    let spy: jest.SpyInstance & addons.StoryGetter;
    let decoratorWrapper: addons.StoryWrapper;
    beforeEach(() => {
      spy = jest.fn(() => 'DEMO');
      ({ decoratorWrapper } = require('../decorator'));
      (addons.default.getChannel as jest.Mock).mockClear();
    });
    test('early return if `render` parameter is "false"', () => {
      decoratorWrapper(spy, context, {
        options: {},
        parameters: { render: false },
      });
      expect(addons.default.getChannel).not.toHaveBeenCalled();
    });
    test('emits en event', () => {
      const render = jest.fn(<T>(v: T): T => v);
      const channel = {
        emit: jest.fn(),
      };
      spy.mockClear();
      (addons.default.getChannel as jest.Mock).mockReturnValueOnce(channel);
      decoratorWrapper(spy, context, {
        options: {},
        parameters: { render },
      });
      expect(spy).toHaveBeenCalledWith(context);
      expect(render).toHaveBeenCalledWith('DEMO', {});
      expect(channel.emit).toHaveBeenCalledWith(UPDATE_SOURCE, {
        source: 'DEMO',
        language: 'html',
      });
    });
  });
});
