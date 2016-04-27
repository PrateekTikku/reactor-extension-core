import ReactDom from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import extensionViewReduxForm from '../../../extensionViewReduxForm';
import ElementPropertiesEditor, { formConfig } from '../elementPropertiesEditor';
import { getFormInstance, createExtensionBridge } from '../../../__tests__/helpers/formTestUtils';

describe('elementPropertiesEditor', () => {
  let extensionBridge;
  let instance;

  beforeAll(() => {
    const FormComponent = extensionViewReduxForm(formConfig)(ElementPropertiesEditor);
    extensionBridge = createExtensionBridge();
    instance = getFormInstance(FormComponent, extensionBridge);
  });

  it('sets form values from settings', () => {
    extensionBridge.init({
      settings: {
        elementProperties:[
          {
            name: 'some prop',
            value: 'some value',
            valueIsRegex: true
          }
        ]
      }
    });

    const { elementPropertyEditor0 } = instance.refs;
    expect(elementPropertyEditor0.props.fields.name.value).toBe('some prop');
    expect(elementPropertyEditor0.props.fields.value.value).toBe('some value');
    expect(elementPropertyEditor0.props.fields.valueIsRegex.value).toBe(true);
  });

  it('sets settings from form values', () => {
    extensionBridge.init();

    const { elementPropertyEditor0 } = instance.refs;

    elementPropertyEditor0.props.fields.name.onChange('some prop set');
    elementPropertyEditor0.props.fields.value.onChange('some value set');
    elementPropertyEditor0.props.fields.valueIsRegex.onChange(true);

    const { elementProperties } = extensionBridge.getSettings();
    expect(elementProperties).toEqual([
      {
        name: 'some prop set',
        value: 'some value set',
        valueIsRegex: true
      }
    ]);
  });

  it('sets error if element property name field is empty and value is not empty', () => {
    extensionBridge.init();

    const { elementPropertyEditor0 } = instance.refs;

    elementPropertyEditor0.props.fields.value.onChange('foo');

    expect(extensionBridge.validate()).toBe(false);

    expect(elementPropertyEditor0.props.fields.name.touched).toBe(true);
    expect(elementPropertyEditor0.props.fields.name.error).toEqual(jasmine.any(String));
  });

  it('creates a new row when the add button is clicked', () => {
    extensionBridge.init();

    const { addButton } = instance.refs;
    addButton.props.onClick();

    const {
      elementPropertyEditor0,
      elementPropertyEditor1,
      elementPropertyEditor2
    } = instance.refs;

    // First row is visible by default.
    expect(elementPropertyEditor0).toBeDefined();
    expect(elementPropertyEditor1).toBeDefined();
    expect(elementPropertyEditor2).toBeUndefined();
  });

  it('deletes a row when requested from row', () => {
    extensionBridge.init({
      settings: {
        elementProperties:[
          {
            name: 'some prop',
            value: 'some value',
            valueIsRegex: true
          },
          {
            name: 'some prop2',
            value: 'some value2',
            valueIsRegex: true
          }
        ]
      }
    });

    const firstEditorRow = instance.refs.elementPropertyEditor0;

    firstEditorRow.props.remove();

    const {
      elementPropertyEditor0,
      elementPropertyEditor1
    } = instance.refs;

    // First row is visible by default.
    expect(elementPropertyEditor0).toBeDefined();
    expect(elementPropertyEditor1).toBeUndefined();

    expect(elementPropertyEditor0.props.fields.name.value).toBe('some prop2');
    expect(elementPropertyEditor0.props.fields.value.value).toBe('some value2');
  });

  it('creates a new row when the enter key is pressed', () => {
    extensionBridge.init();

    const firstEditorRow = instance.refs.elementPropertyEditor0;
    const input = ReactDom.findDOMNode(firstEditorRow.refs.nameField);
    TestUtils.Simulate.keyPress(input, {key: 'Enter', keyCode: 13, which: 13});

    const {
      elementPropertyEditor0,
      elementPropertyEditor1,
      elementPropertyEditor2
    } = instance.refs;

    // First row is visible by default.
    expect(elementPropertyEditor0).toBeDefined();
    expect(elementPropertyEditor1).toBeDefined();
    expect(elementPropertyEditor2).toBeUndefined();
  });
});
