import TestUtils from 'react-addons-test-utils';
import Coral from '../../reduxFormCoralUI';
import setUpConnectedForm from '../../__tests__/helpers/setUpConnectedForm';
import ElementExists, { reducers } from '../elementExists';

const { instance, extensionBridge } = setUpConnectedForm(ElementExists, reducers);

describe('element exists view', () => {
  it('sets form values from config', () => {
    extensionBridge.init({
      config: {
        elementSelector: '.foo'
      }
    });

    const { specificElements } = instance.refs;

    expect(specificElements.props.fields.elementSelector.value).toBe('.foo');
  });

  it('sets config from form values', () => {
    extensionBridge.init();

    const { specificElements } = instance.refs;

    specificElements.props.fields.elementSelector.onChange('.foo');

    const { elementSelector } = extensionBridge.getConfig();

    expect(elementSelector).toBe('.foo');
  });

  it('sets validation errors', () => {
    extensionBridge.init();

    const { specificElements } = instance.refs;

    expect(extensionBridge.validate()).toBe(false);
    expect(specificElements.props.fields.elementSelector.error).toEqual(jasmine.any(String));
  });
});
