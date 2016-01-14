import TestUtils from 'react-addons-test-utils';
import Coral from '../../reduxFormCoralUI';
import setupComponent from '../../__tests__/helpers/setupComponent';
import CookieOptOut from '../cookieOptOut';

const {instance, extensionBridge} = setupComponent(CookieOptOut);
const getParts = () => {
  return {
    checkbox: TestUtils.findRenderedComponentWithType(instance, Coral.Checkbox)
  };
};

describe('cookie out-out view', () => {
  it('sets form values from config', () => {
    extensionBridge.init({
      config: {
        acceptsCookies: true
      }
    });

    const { checkbox } = getParts();

    expect(checkbox.props.checked).toBe(true);
  });

  it('sets config from form values', () => {
    extensionBridge.init();

    const { checkbox } = getParts();

    checkbox.props.onChange(true);

    expect(extensionBridge.getConfig()).toEqual({
      acceptsCookies: true
    });
  });
});
