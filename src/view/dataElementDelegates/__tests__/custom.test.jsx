import TestUtils from 'react-addons-test-utils';
import Coral from '../../reduxFormCoralUI';
import setupComponent from '../../__tests__/helpers/setupComponent';
import Custom, { reducers } from '../custom';
import ErrorIcon from '../../components/errorIcon';

const {instance, extensionBridge} = setupComponent(Custom, reducers);
const getParts = () => {
  let errorIcons = TestUtils.scryRenderedComponentsWithType(instance, ErrorIcon);

  return {
    button: TestUtils.findRenderedComponentWithType(instance, Coral.Button),
    errorIcon: errorIcons.length ? errorIcons[0] : null
  };
};

describe('custom view', () => {
  it('opens code editor with script value when button is clicked and stores result', () => {
    extensionBridge.init({
      config: {
        script: 'foo'
      }
    });

    window.extensionBridge = {
      openCodeEditor: jasmine.createSpy().and.callFake((script, callback) => {
        callback('bar');
      })
    };

    const { button } = getParts();

    button.props.onClick();

    expect(window.extensionBridge.openCodeEditor)
      .toHaveBeenCalledWith('foo', jasmine.any(Function));
    expect(extensionBridge.validate()).toBe(true);
    expect(extensionBridge.getConfig()).toEqual({
      script: 'bar',
      __rawScripts: ['script']
    });

    delete window.extensionBridge;
  });

  it('sets error if script is empty', () => {
    extensionBridge.init();

    expect(extensionBridge.validate()).toBe(false);

    const { errorIcon } = getParts();

    expect(errorIcon.props.message).toEqual(jasmine.any(String));
  });
});
