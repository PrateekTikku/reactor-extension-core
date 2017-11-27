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
import { Field } from 'redux-form';
import CheckboxList from '../components/checkboxList';

const deviceTypeOptions = [
  'Desktop',
  'iPhone',
  'iPad',
  'iPod',
  'Nokia',
  'Windows Phone',
  'Blackberry',
  'Android'
];

const DeviceType = () =>
  (<Field name="deviceTypes" component={ CheckboxList } options={ deviceTypeOptions } />);

export default DeviceType;

export const formConfig = {
  settingsToFormValues(values, settings) {
    return {
      ...values,
      ...settings
    };
  },
  formValuesToSettings(settings, values) {
    return {
      ...settings,
      ...values,
      deviceTypes: values.deviceTypes || [] // An array is required.
    };
  }
};
