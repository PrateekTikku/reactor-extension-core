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
import Textfield from '@react/react-spectrum/Textfield';
import Button from '@react/react-spectrum/Button';
import ElementSelector, { formConfig } from '../elementSelector';
import createExtensionBridge from '../../../__tests__/helpers/createExtensionBridge';
import bootstrap from '../../../bootstrap';

const getReactComponents = (wrapper) => {
  wrapper.update();
  const textfield = wrapper.find(Textfield);
  const button = wrapper.find(Button);

  return {
    textfield,
    button
  };
};

describe('elementSelector', () => {
  let extensionBridge;
  let instance;

  beforeAll(() => {
    extensionBridge = createExtensionBridge();
    instance = mount(bootstrap(ElementSelector, formConfig, extensionBridge));
  });

  it('sets form values from settings', () => {
    extensionBridge.init({
      settings: {
        elementSelector: 'foo'
      }
    });

    const { textfield } = getReactComponents(instance);

    expect(textfield.props().value).toBe('foo');
  });

  it('sets settings from form values', () => {
    extensionBridge.init();

    const { textfield } = getReactComponents(instance);

    textfield.props().onChange('some prop set');

    expect(extensionBridge.getSettings()).toEqual({
      elementSelector: 'some prop set'
    });
  });

  it('sets error if element selector field is empty', () => {
    extensionBridge.init();

    expect(extensionBridge.validate()).toBe(false);

    const { textfield } = getReactComponents(instance);

    expect(textfield.props().invalid).toBe(true);
  });
});
