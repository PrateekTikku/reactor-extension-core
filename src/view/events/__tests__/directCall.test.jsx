import { mount } from 'enzyme';
import Textfield from '@coralui/react-coral/lib/Textfield';
import { ValidationWrapper } from '@reactor/react-components';
import DirectCall from '../directCall';
import { getFormComponent, createExtensionBridge } from '../../__tests__/helpers/formTestUtils';

const getReactComponents = (wrapper) => {
  const nameField = wrapper.find(Textfield).filterWhere(n => n.prop('name') === 'name').node;
  const nameWrapper = wrapper.find(ValidationWrapper).node;

  return {
    nameField,
    nameWrapper
  };
};

describe('direct call view', () => {
  let extensionBridge;
  let instance;

  beforeAll(() => {
    extensionBridge = createExtensionBridge();
    instance = mount(getFormComponent(DirectCall, extensionBridge));
  });

  it('sets form values from settings', () => {
    extensionBridge.init({
      settings: {
        name: 'foo'
      }
    });

    const { nameField } = getReactComponents(instance);

    expect(nameField.props.value).toBe('foo');
  });

  it('sets settings from form values', () => {
    extensionBridge.init();

    const { nameField } = getReactComponents(instance);
    nameField.props.onChange('foo');

    expect(extensionBridge.getSettings()).toEqual({
      name: 'foo'
    });
  });

  it('sets errors if required values are not provided', () => {
    extensionBridge.init();
    expect(extensionBridge.validate()).toBe(false);

    const { nameWrapper } = getReactComponents(instance);

    expect(nameWrapper.props.error).toEqual(jasmine.any(String));
  });
});
