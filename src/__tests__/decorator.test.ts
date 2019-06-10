import * as addons from '@storybook/addons';
// import { UPDATE_SOURCE } from '../constants';
jest.mock('@storybook/addons');

describe('Addon Decorator', () => {
  let withSource: any;
  let onSpy: any;
  const context = {};
  beforeEach(() => {
    onSpy = jest.fn();
    (addons.makeDecorator as any).mockImplementation((v: any) => v);
    (addons.default.getChannel as any).mockImplementation(() => ({
      on: onSpy,
    }));
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
    let spy: any;
    let wrapper: any;
    beforeEach(() => {
      spy = jest.fn(() => true);
      ({ wrapper } = withSource);
      (addons.default.getChannel as any).mockClear();
    });
    test('early return if parameters is "false"', () => {
      wrapper(spy, context, { parameters: false });
      expect(addons.default.getChannel).not.toHaveBeenCalled();
    });
  });
  describe('listener', () => {});
});
