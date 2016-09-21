import React from 'react';
import Radio from '@coralui/react-coral/lib/Radio';

import SpecificElements, { formConfig as specificElementsFormConfig } from './specificElements';
import mergeFormConfigs from '../../utils/mergeFormConfigs';

export default ({ ...props }) => {
  const { elementSpecificity } = props.fields;

  return (
    <div>
      <div>
        <Radio
          { ...elementSpecificity }
          value="specific"
          checked={ elementSpecificity.value === 'specific' }
        >
          specific elements
        </Radio>
        <Radio
          { ...elementSpecificity }
          value="any"
          checked={ elementSpecificity.value === 'any' }
        >
          any element
        </Radio>
      </div>
      {
        elementSpecificity.value === 'specific' ?
          <SpecificElements fields={ props.fields } /> : null
      }
    </div>
  );
};

export const formConfig = mergeFormConfigs(
  specificElementsFormConfig,
  {
    fields: [
      'elementSpecificity'
    ],
    settingsToFormValues: (values, options) => {
      const { settings: { elementSelector, elementProperties }, settingsIsNew } = options;

      return {
        ...values,
        elementSpecificity: settingsIsNew || elementSelector || elementProperties ?
          'specific' : 'any'
      };
    },
    formValuesToSettings: (settings, values) => {
      settings = {
        ...settings
      };

      const { elementSpecificity } = values;

      if (elementSpecificity === 'any') {
        delete settings.elementSelector;
        delete settings.elementProperties;
      }

      delete settings.elementSpecificity;

      return settings;
    },
    validate(errors, values) {
      errors = {
        ...errors
      };

      errors = specificElementsFormConfig.validate(errors, values);
      if (values.elementSpecificity !== 'specific') {
        delete errors.elementSelector;
      }

      return errors;
    }
  }
);
