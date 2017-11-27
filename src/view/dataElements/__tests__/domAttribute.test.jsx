/***************************************************************************************
 * (c) 2017 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 ****************************************************************************************/

import { mount } from 'enzyme';
import ErrorTip from '@reactor/react-components/lib/errorTip';
import Textfield from '@coralui/react-coral/lib/Textfield';
import Select from '@coralui/react-coral/lib/Select';
import { Field } from 'redux-form';
import DomAttribute, { formConfig } from '../domAttribute';
import createExtensionBridge from '../../__tests__/helpers/createExtensionBridge';
import bootstrap from '../../bootstrap';

const getReactComponents = (wrapper) => {
  const fields = wrapper.find(Field);

  const elementPropertyPresetsSelect = wrapper.find(Select).node;
  const elementSelectorField = fields.filterWhere(n => n.prop('name') === 'elementSelector');
  const elementSelectorTextfield = elementSelectorField.find(Textfield).node;
  const elementSelectorErrorTip = elementSelectorField.find(ErrorTip).node;
  const customElementPropertyField = fields
    .filterWhere(n => n.prop('name') === 'customElementProperty');
  const customElementPropertyTextfield = customElementPropertyField.find(Textfield).node;
  const customElementPropertyErrorTip = customElementPropertyField.find(ErrorTip).node;

  return {
    elementPropertyPresetsSelect,
    elementSelectorTextfield,
    elementSelectorErrorTip,
    customElementPropertyTextfield,
    customElementPropertyErrorTip
  };
};

describe('DOM attribute data element view', () => {
  let extensionBridge;
  let instance;

  beforeAll(() => {
    extensionBridge = createExtensionBridge();
    instance = mount(bootstrap(DomAttribute, formConfig, extensionBridge));
  });

  it('selects ID preset for new settings', () => {
    extensionBridge.init();

    const { elementPropertyPresetsSelect } = getReactComponents(instance);

    expect(elementPropertyPresetsSelect.props.value).toBe('id');
  });


  it('sets form values from settings using element property preset', () => {
    extensionBridge.init({
      settings: {
        elementSelector: 'foo',
        elementProperty: 'innerHTML'
      }
    });

    const { elementSelectorTextfield, elementPropertyPresetsSelect } = getReactComponents(instance);

    expect(elementSelectorTextfield.props.value).toBe('foo');
    expect(elementPropertyPresetsSelect.props.value).toBe('innerHTML');
  });

  it('sets form values from settings using custom element property', () => {
    extensionBridge.init({
      settings: {
        elementSelector: 'foo',
        elementProperty: 'bar'
      }
    });

    const {
      elementSelectorTextfield,
      elementPropertyPresetsSelect,
      customElementPropertyTextfield
    } = getReactComponents(instance);

    expect(elementSelectorTextfield.props.value).toBe('foo');
    expect(elementPropertyPresetsSelect.props.value).toBe('custom');
    expect(customElementPropertyTextfield.props.value).toBe('bar');
  });

  it('sets error if element selector not provided', () => {
    extensionBridge.init();

    expect(extensionBridge.validate()).toBe(false);

    const { elementSelectorErrorTip } = getReactComponents(instance);

    expect(elementSelectorErrorTip).toBeDefined();
  });

  it('sets settings from form values using element property preset', () => {
    extensionBridge.init();

    const { elementSelectorTextfield, elementPropertyPresetsSelect } = getReactComponents(instance);

    elementSelectorTextfield.props.onChange('foo');
    elementPropertyPresetsSelect.props.onChange({
      value: 'innerHTML',
      label: 'HTML'
    });

    expect(extensionBridge.getSettings()).toEqual({
      elementSelector: 'foo',
      elementProperty: 'innerHTML'
    });
  });

  it('sets settings from form values using custom element property', () => {
    extensionBridge.init();

    const {
      elementSelectorTextfield,
      elementPropertyPresetsSelect
      } = getReactComponents(instance);

    elementSelectorTextfield.props.onChange('foo');
    elementPropertyPresetsSelect.props.onChange({
      value: 'custom',
      label: 'other attribute'
    });

    const {
      customElementPropertyTextfield
    } = getReactComponents(instance);

    customElementPropertyTextfield.props.onChange('bar');

    expect(extensionBridge.getSettings()).toEqual({
      elementSelector: 'foo',
      elementProperty: 'bar'
    });
  });

  it('sets errors if required values are not provided', () => {
    extensionBridge.init({
      settings: {
        elementSelector: 'foo',
        elementProperty: ''
      }
    });

    expect(extensionBridge.validate()).toBe(false);

    const { customElementPropertyErrorTip } = getReactComponents(instance);

    expect(customElementPropertyErrorTip).toBeDefined();
  });
});
