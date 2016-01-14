import TestUtils from 'react-addons-test-utils';
import Coral from '../../reduxFormCoralUI';
import setupComponent from '../../__tests__/helpers/setupComponent';
import Browser, { reducers } from '../browser';
import CheckboxList from '../../components/checkboxList';

const {instance, extensionBridge} = setupComponent(Browser, reducers);
const getParts = () => {
  return {
    checkboxList: TestUtils.findRenderedComponentWithType(instance, CheckboxList)
  };
};

const browsers = [
  'Chrome',
  'Safari'
];

describe('browser view', () => {
  it('sets form values from config', () => {
    extensionBridge.init({
      config: {
        browsers: browsers
      }
    });

    const { checkboxList } = getParts();

    expect(checkboxList.props.value).toEqual(browsers);
  });

  it('sets config from form values', () => {
    extensionBridge.init();

    const { checkboxList } = getParts();
    checkboxList.props.onChange(browsers);

    expect(extensionBridge.getConfig()).toEqual({
      browsers
    });
  });

  it('sets browsers to an empty array if nothing is selected', () => {
    extensionBridge.init();
    expect(extensionBridge.getConfig()).toEqual({
      browsers: []
    });
  });
});
