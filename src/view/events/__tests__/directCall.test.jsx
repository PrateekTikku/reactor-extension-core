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
import DirectCall, { formConfig } from '../directCall';
import createExtensionBridge from '../../__tests__/helpers/createExtensionBridge';
import bootstrap from '../../bootstrap';

const getReactComponents = (wrapper) => {
  const identifierTextfield =
    wrapper.find(Textfield).filterWhere(n => n.prop('name') === 'identifier').node;
  const identifierErrorTip = wrapper.find(ErrorTip).node;

  return {
    identifierTextfield,
    identifierErrorTip
  };
};

describe('direct call event view', () => {
  let extensionBridge;
  let instance;

  beforeAll(() => {
    extensionBridge = createExtensionBridge();
    instance = mount(bootstrap(DirectCall, formConfig, extensionBridge));
  });

  it('sets form values from settings', () => {
    extensionBridge.init({
      settings: {
        identifier: 'foo'
      }
    });

    const { identifierTextfield } = getReactComponents(instance);

    expect(identifierTextfield.props.value).toBe('foo');
  });

  it('sets settings from form values', () => {
    extensionBridge.init();

    const { identifierTextfield } = getReactComponents(instance);
    identifierTextfield.props.onChange('foo');

    expect(extensionBridge.getSettings()).toEqual({
      identifier: 'foo'
    });
  });

  it('sets errors if required values are not provided', () => {
    extensionBridge.init();
    expect(extensionBridge.validate()).toBe(false);

    const { identifierErrorTip } = getReactComponents(instance);

    expect(identifierErrorTip).toBeDefined();
  });
});
