import TestUtils from 'react-addons-test-utils';

import setUpConnectedForm from '../../__tests__/helpers/setUpConnectedForm';
import TimeOnSite from '../timeOnSite';

const { instance, extensionBridge } = setUpConnectedForm(TimeOnSite);

describe('time on site view', () => {
  it('sets operator to greater than by default', () => {
    extensionBridge.init();

    const { operatorField } = instance.refs;

    expect(operatorField.props.value).toBe('>');
  });

  it('sets form values from config', () => {
    extensionBridge.init({
      config: {
        operator: '=',
        minutes: 100
      }
    });

    const { operatorField, minutesField } = instance.refs;

    expect(operatorField.props.value).toBe('=');
    expect(minutesField.props.value).toBe(100);
  });

  it('sets config from form values', () => {
    extensionBridge.init();

    const { operatorField, minutesField } = instance.refs;

    operatorField.props.onChange('=');
    minutesField.props.onChange(100);

    expect(extensionBridge.getConfig()).toEqual({
      operator: '=',
      minutes: 100
    });
  });

  it('sets errors if required values are not provided', () => {
    extensionBridge.init();
    expect(extensionBridge.validate()).toBe(false);

    const { minutesWrapper } = instance.refs;

    expect(minutesWrapper.props.error).toEqual(jasmine.any(String));
  });

  it('sets error if count value is not a number', () => {
    extensionBridge.init();
    expect(extensionBridge.validate()).toBe(false);

    const { minutesField, minutesWrapper } = instance.refs;

    minutesField.props.onChange('12.abc');

    expect(minutesWrapper.props.error).toEqual(jasmine.any(String));
  });
});
