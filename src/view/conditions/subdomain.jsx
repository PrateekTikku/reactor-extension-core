/***************************************************************************************
 * Copyright 2019 Adobe. All rights reserved.
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
import Textfield from '@react/react-spectrum/Textfield';
import { FieldArray } from 'redux-form';
import WrappedField from '../components/wrappedField';

import RegexToggle from '../components/regexToggle';
import MultipleItemEditor from './components/multipleItemEditor';

const renderItem = field => (
  <div data-row className="u-inlineBlock u-flex">
    <span className="u-flexCenter u-gapRight">Subdomain equals</span>
    <label className="u-gapRight u-flexOne">
      <WrappedField
        className="u-fullWidth"
        name={`${field}.value`}
        component={Textfield}
        componentClassName="u-fullWidth u-minFieldWidth"
      />
    </label>
    <WrappedField
      name={`${field}.valueIsRegex`}
      component={RegexToggle}
      valueFieldName={`${field}.value`}
    />
  </div>
);

const Subdomain = () => (
  <FieldArray
    name="subdomains"
    renderItem={renderItem}
    component={MultipleItemEditor}
  />
);

export default Subdomain;

export const formConfig = {
  settingsToFormValues(values, settings) {
    values = {
      ...values,
      ...settings
    };

    if (!values.subdomains) {
      values.subdomains = [];
    }

    if (!values.subdomains.length) {
      values.subdomains.push({});
    }

    return values;
  },
  formValuesToSettings(settings, values) {
    // We intentionally don't filter out empty values because a user may be attempting
    // to match no subdomain.
    return {
      ...settings,
      ...values
    };
  },
  validate(errors, values) {
    errors = {
      ...errors
    };

    const subdomainsErrors = (values.subdomains || []).map((subdomain) => {
      const result = {};

      if (!subdomain.value) {
        result.value = 'Please specify a subdomain.';
      }

      return result;
    });

    errors.subdomains = subdomainsErrors;

    return errors;
  }
};
