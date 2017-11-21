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
import Textfield from '@coralui/react-coral/lib/Textfield';
import ErrorTip from '@reactor/react-components/lib/errorTip';
import JavaScriptVariable, { formConfig } from '../javascriptVariable';
import createExtensionBridge from '../../__tests__/helpers/createExtensionBridge';
import bootstrap from '../../bootstrap';

const getReactComponents = (wrapper) => {
  const pathTextfield = wrapper.find(Textfield).node;
  const pathErrorTip = wrapper.find(ErrorTip).node;

  return {
    pathTextfield,
    pathErrorTip
  };
};

describe('JavaScript variable data element view', () => {
  let extensionBridge;
  let instance;

  beforeAll(() => {
    extensionBridge = createExtensionBridge();
    instance = mount(bootstrap(JavaScriptVariable, formConfig, extensionBridge));
  });

  it('sets form values from settings', () => {
    extensionBridge.init({
      settings: {
        path: 'foo'
      }
    });

    const { pathTextfield } = getReactComponents(instance);

    expect(pathTextfield.props.value).toBe('foo');
  });

  it('sets settings from form values', () => {
    extensionBridge.init();

    const { pathTextfield } = getReactComponents(instance);

    pathTextfield.props.onChange('foo');

    expect(extensionBridge.getSettings()).toEqual({
      path: 'foo'
    });
  });

  it('sets errors if required values are not provided', () => {
    extensionBridge.init();
    expect(extensionBridge.validate()).toBe(false);

    const { pathErrorTip } = getReactComponents(instance);

    expect(pathErrorTip).toBeDefined();
  });
});
