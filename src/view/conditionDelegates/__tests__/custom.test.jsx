import Custom from '../custom';
import { getFormInstance, createExtensionBridge } from '../../__tests__/helpers/formTestUtils';

describe('custom view', () => {
  let extensionBridge;
  let instance;

  beforeAll(() => {
    extensionBridge = createExtensionBridge();
    instance = getFormInstance(Custom, extensionBridge);
  });

  it('opens code editor with script value when button is clicked and stores result', () => {
    extensionBridge.init({
      settings: {
        script: 'function(event, target) { foo }'
      }
    });

    window.extensionBridge = {
      openCodeEditor: jasmine.createSpy().and.callFake((script, callback) => {
        callback('bar');
      })
    };

    const { openEditorButton } = instance.refs;

    openEditorButton.props.onClick();

    expect(window.extensionBridge.openCodeEditor)
      .toHaveBeenCalledWith('foo', jasmine.any(Function));
    expect(extensionBridge.validate()).toBe(true);
    expect(extensionBridge.getSettings()).toEqual({
      script: 'function(event, target) { bar }'
    });

    delete window.extensionBridge;
  });

  it('sets error if script is empty', () => {
    extensionBridge.init();

    expect(extensionBridge.validate()).toBe(false);

    const { scriptErrorIcon } = instance.refs;

    expect(scriptErrorIcon.props.message).toBeDefined();
  });
});
