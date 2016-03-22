import StandardEvent from '../../components/standardEvent';
import { getFormInstance, createExtensionBridge } from '../../../__tests__/helpers/formTestUtils';

describe('standard event view', () => {
  let extensionBridge;
  let instance;

  beforeAll(() => {
    extensionBridge = createExtensionBridge();
    instance = getFormInstance(StandardEvent, extensionBridge);
  });

  it('sets form values from settings', () => {
    extensionBridge.init({
      settings: {
        elementSelector: '.foo',
        bubbleStop: true
      }
    });

    const { elementFilter, advancedEventOptions } = instance.refs;

    expect(elementFilter.props.fields.elementSelector.value).toBe('.foo');
    expect(advancedEventOptions.props.fields.bubbleStop.value).toBe(true);
  });

  it('sets settings from form values', () => {
    extensionBridge.init();

    const { elementFilter, advancedEventOptions } = instance.refs;

    elementFilter.props.fields.elementSelector.onChange('.foo');
    advancedEventOptions.props.fields.bubbleStop.onChange(true);

    const { elementSelector, bubbleStop } = extensionBridge.getSettings();
    expect(elementSelector).toBe('.foo');
    expect(bubbleStop).toBe(true);
  });

  it('sets validation errors', () => {
    extensionBridge.init();

    const { elementFilter } = instance.refs;

    expect(extensionBridge.validate()).toBe(false);
    expect(elementFilter.props.fields.elementSelector.error).toEqual(jasmine.any(String));
  });
});
