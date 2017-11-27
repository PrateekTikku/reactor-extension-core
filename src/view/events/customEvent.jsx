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

import React from 'react';
import Textfield from '@coralui/redux-form-react-coral/lib/Textfield';
import Link from '@coralui/react-coral/lib/Link';
import { Field } from 'redux-form';
import DecoratedInput from '@reactor/react-components/lib/reduxForm/decoratedInput';
import InfoTip from '@reactor/react-components/lib/infoTip';

import AdvancedEventOptions, { formConfig as advancedEventOptionsFormConfig } from './components/advancedEventOptions';
import ElementFilter, { formConfig as elementFilterFormConfig } from './components/elementFilter';
import mergeFormConfigs from '../utils/mergeFormConfigs';

const CustomEvent = () => (
  <div>
    <label>
      <span className="u-label">
        Custom Event Type
      </span>
      <Field
        name="type"
        component={ DecoratedInput }
        inputComponent={ Textfield }
      />
      <InfoTip placement="bottom">
        This is the name of the event that will be triggered.
        <br />
        <Link
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors"
          rel="noopener noreferrer"
          target="_blank"
          subtle
        >
          Learn more about custom events.
        </Link>
      </InfoTip>
    </label>
    <ElementFilter />
    <AdvancedEventOptions />
  </div>
);

export default CustomEvent;

export const formConfig = mergeFormConfigs(
  elementFilterFormConfig,
  advancedEventOptionsFormConfig,
  {
    settingsToFormValues: (values, settings) => ({
      ...values,
      type: settings.type
    }),
    formValuesToSettings: (settings, values) => ({
      ...settings,
      type: values.type
    }),
    validate: (errors, values) => {
      errors = {
        ...errors
      };

      if (!values.type) {
        errors.type = 'Please specify a custom event type.';
      }

      return errors;
    }
  }
);
