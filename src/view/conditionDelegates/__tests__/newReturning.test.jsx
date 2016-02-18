import TestUtils from 'react-addons-test-utils';

import NewReturning from '../newReturning';
import setUpConnectedForm from '../../__tests__/helpers/setUpConnectedForm';

const { instance, extensionBridge } = setUpConnectedForm(NewReturning);

describe('new/returning visitor view', () => {
  it('sets new visitor radio as checked by default', () => {
    extensionBridge.init();

    const { newVisitorRadio, returningVisitorRadio } = instance.refs;

    expect(newVisitorRadio.props.checked).toBe(true);
    expect(returningVisitorRadio.props.checked).toBe(false);
  });

  it('sets form values from settings', () => {
    extensionBridge.init({
      settings: {
        isNewVisitor: false
      }
    });

    const { newVisitorRadio, returningVisitorRadio } = instance.refs;

    expect(newVisitorRadio.props.checked).toBe(false);
    expect(returningVisitorRadio.props.checked).toBe(true);
  });

  it('sets settings from form values', () => {
    extensionBridge.init();

    const { returningVisitorRadio } = instance.refs;

    returningVisitorRadio.props.onChange('returning');

    expect(extensionBridge.getSettings()).toEqual({
      isNewVisitor: false
    });
  });
});
