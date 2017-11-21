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
import InfoTip from '@reactor/react-components/lib/infoTip';
import DecoratedInput from '@reactor/react-components/lib/reduxForm/decoratedInput';
import { Field } from 'redux-form';

import { isNumber } from '../utils/validators';
import comparisonOperatorOptions from './comparisonOperatorOptions';

const CartItemQuantity = () => (
  <div>
    <div>
      <label>
        <span className="u-label">
          The cart item quantity identified by the data element
        </span>
        <Field
          name="dataElement"
          component={ DecoratedInput }
          inputComponent={ Textfield }
          supportDataElementName
        />
        <InfoTip className="u-noPadding" placement="bottom">
          Create and/or select the data element that contains the cart quantity. Because this MUST
          be a data element, only enter the name--no need to add &quot;%&quot; before or after.
        </InfoTip>
      </label>
    </div>
    <div className="u-gapTop">
      <label className="u-gapRight">
        <span className="u-label">is</span>
        <Field
          name="operator"
          component={ Select }
          options={ comparisonOperatorOptions }
        />
      </label>
      <label>
        <span className="u-label">the value</span>
        <Field
          name="quantity"
          component={ DecoratedInput }
          inputComponent={ Textfield }
          inputClassName="u-smallTextfield"
        />
      </label>
    </div>
  </div>
);

export default CartItemQuantity;

export const formConfig = {
  settingsToFormValues(values, settings) {
    return {
      ...values,
      ...settings,
      operator: settings.operator || '>'
    };
  },
  formValuesToSettings(settings, values) {
    return {
      ...settings,
      ...values,
      quantity: Number(values.quantity)
    };
  },
  validate(errors, values) {
    errors = {
      ...errors
    };

    if (!values.dataElement) {
      errors.dataElement = 'Please specify a data element.';
    }

    if (!isNumber(values.quantity)) {
      errors.quantity = 'Please specify a number for the cart item quantity.';
    }

    return errors;
  }
};
