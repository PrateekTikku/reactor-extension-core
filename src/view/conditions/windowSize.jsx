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
import Select from '@coralui/redux-form-react-coral/lib/Select';
import { Field } from 'redux-form';
import DecoratedInput from '@reactor/react-components/lib/reduxForm/decoratedInput';

import { isNumberLike } from '../utils/validators';
import comparisonOperatorOptions from './comparisonOperatorOptions';

const WindowSize = () => (
  <div>
    <div>
      <label className="u-gapRight">
        <span className="u-label">The user&apos;s window size width is</span>
        <Field
          name="widthOperator"
          component={ Select }
          options={ comparisonOperatorOptions }
          backspaceRemoves={ false }
        />
      </label>
      <label>
        <Field
          name="width"
          className="u-gapRight"
          component={ DecoratedInput }
          inputComponent={ Textfield }
          inputClassName="u-smallTextfield"
        />
        <span>px</span>
      </label>
    </div>
    <div className="u-gapTop">
      <label className="u-gapRight">
        <span className="u-label">and height is</span>
        <Field
          name="heightOperator"
          component={ Select }
          options={ comparisonOperatorOptions }
          backspaceRemoves={ false }
        />
      </label>
      <label>
        <Field
          name="height"
          className="u-gapRight"
          component={ DecoratedInput }
          inputComponent={ Textfield }
          inputClassName="u-smallTextfield"
        />
        <span>px</span>
      </label>
    </div>
  </div>
);

export default WindowSize;

export const formConfig = {
  settingsToFormValues(values, settings) {
    return {
      ...values,
      ...settings,
      widthOperator: settings.widthOperator || '>',
      heightOperator: settings.heightOperator || '>'
    };
  },
  formValuesToSettings(settings, values) {
    return {
      ...settings,
      ...values,
      width: Number(values.width),
      height: Number(values.height)
    };
  },
  validate(errors, values) {
    errors = {
      ...errors
    };

    if (!isNumberLike(values.width)) {
      errors.width = 'Please specify a number for width.';
    }

    if (!isNumberLike(values.height)) {
      errors.height = 'Please specify a number for height.';
    }

    return errors;
  }
};
