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
import Button from '@coralui/react-coral/lib/Button';
import { getFormComponent, createExtensionBridge } from '../../../__tests__/helpers/formTestUtils';
import ElementSelector, { formConfig } from '../elementSelector';
import extensionViewReduxForm from '../../../extensionViewReduxForm';

const getReactComponents = (wrapper) => {
  const textfield = wrapper.find(Textfield).node;
  const button = wrapper.find(Button).node;
  const errorTip = wrapper.find(ErrorTip).node;

  return {
    textfield,
    button,
    errorTip
  };
};

describe('elementSelector', () => {
  let extensionBridge;
  let instance;

  beforeAll(() => {
    const FormComponent = extensionViewReduxForm(formConfig)(ElementSelector);
    extensionBridge = createExtensionBridge();
    instance = mount(getFormComponent(FormComponent, extensionBridge));
  });

  it('sets form values from settings', () => {
    extensionBridge.init({
      settings: {
        elementSelector: 'foo'
      }
    });

    const { textfield } = getReactComponents(instance);

    expect(textfield.props.value).toBe('foo');
  });

  it('sets settings from form values', () => {
    extensionBridge.init();

    const { textfield } = getReactComponents(instance);

    textfield.props.onChange('some prop set');

    expect(extensionBridge.getSettings()).toEqual({
      elementSelector: 'some prop set'
    });
  });

  it('sets error if element selector field is empty', () => {
    extensionBridge.init();

    expect(extensionBridge.validate()).toBe(false);

    const { errorTip } = getReactComponents(instance);

    expect(errorTip).toBeDefined();
  });
});
