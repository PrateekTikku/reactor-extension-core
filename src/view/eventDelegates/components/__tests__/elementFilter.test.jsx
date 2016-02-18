import TestUtils from 'react-addons-test-utils';
import setUpConnectedForm from '../../../__tests__/helpers/setUpConnectedForm';
import extensionViewReduxForm from '../../../extensionViewReduxForm';
import ElementFilter, { formConfig } from '../elementFilter';

const FormComponent = extensionViewReduxForm(formConfig)(ElementFilter);
const { instance, extensionBridge } = setUpConnectedForm(FormComponent);

describe('elementFilter', () => {
  it('updates view properly when elementSelector is provided', () => {
    extensionBridge.init({
      settings: {
        elementSelector: '.foo'
      }
    });

    const { specificElementsRadio, specificElements } = instance.refs;

    expect(specificElementsRadio.props.checked).toBe(true);
    expect(specificElements).toBeDefined();
  });

  it('updates view properly when elementSelector is not provided', () => {
    extensionBridge.init({settings: {}});

    const { anyElementRadio, specificElements } = instance.refs;

    expect(anyElementRadio.props.checked).toBe(true);
    expect(specificElements).not.toBeDefined();
  });

  it('removes elementSelector and elementProperties from settings if any ' +
    'element radio is selected', () => {
    extensionBridge.init({
      settings: {
        elementSelector: '.foo',
        elementProperties: [
          {
            name: 'a',
            value: 'b'
          }
        ]
      }
    });

    const { anyElementRadio } = instance.refs;

    anyElementRadio.props.onChange(anyElementRadio.props.value);

    const { elementSelector, elementProperties } = extensionBridge.getSettings();

    expect(elementSelector).toBeUndefined();
    expect(elementProperties).toBeUndefined();
  });

  it('includes specificElements errors if specific element radio is selected', () => {
    extensionBridge.init();

    const { specificElementsRadio } = instance.refs;

    specificElementsRadio.props.onChange(specificElementsRadio.props.value);

    expect(extensionBridge.validate()).toBe(false);

    const { specificElements } = instance.refs;

    expect(specificElements.props.fields.elementSelector.error).toEqual(jasmine.any(String));
  });

  it('excludes specificElements errors if any element radio is selected', () => {
    extensionBridge.init();

    const { anyElementRadio } = instance.refs;

    anyElementRadio.props.onChange(anyElementRadio.props.value);

    expect(extensionBridge.validate()).toBe(true);
  });
});
