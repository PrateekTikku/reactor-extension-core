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
import RadioGroup from '@react/react-spectrum/RadioGroup';
import Radio from '@react/react-spectrum/Radio';
import SpecificElements, { formConfig as specificElementsFormConfig } from './components/specificElements';
import DelayType, { formConfig as delayTypeFormConfig } from './components/delayType';
import mergeFormConfigs from '../utils/mergeFormConfigs';
import WrappedField from '../components/wrappedField';

const EntersViewport = () => (
  <div>
    <SpecificElements />
    <DelayType />
    <div>
      <label>
        <span className="u-verticalAlignMiddle u-gapRight">at the frequency of</span>
        <WrappedField
          name="frequency"
          component={RadioGroup}
        >
          <Radio value="firstEntry" label="first time element enters viewport" />
          <Radio value="everyEntry" label="every time element enters viewport" />
        </WrappedField>
      </label>
    </div>
  </div>
);

export default EntersViewport;

export const formConfig = mergeFormConfigs(
  specificElementsFormConfig,
  delayTypeFormConfig,
  {
    settingsToFormValues: (values, settings) => ({
      ...values,
      frequency: settings.frequency || 'firstEntry'
    }),
    formValuesToSettings: (settings, values) => ({
      ...settings,
      frequency: values.frequency
    })
  }
);
