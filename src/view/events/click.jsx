import React from 'react';
import Checkbox from '@coralui/react-coral/lib/Checkbox';
import ElementFilter, { formConfig as elementFilterFormConfig } from './components/elementFilter';
import AdvancedEventOptions, { formConfig as advancedEventOptionsFormConfig } from './components/advancedEventOptions';
import extensionViewReduxForm from '../extensionViewReduxForm';
import reduceReducers from 'reduce-reducers';

function Click({ ...props }) {
  const { delayLinkActivation } = props.fields;

  return (
    <div>
      <ElementFilter fields={ props.fields } />
      <Checkbox
        className="u-block"
        { ...delayLinkActivation }
      >
        If the element is a link, delay navigation until rule runs
      </Checkbox>
      <AdvancedEventOptions fields={ props.fields } />
    </div>
  );
}

const formConfig = {
  fields: [
    'delayLinkActivation'
  ].concat(elementFilterFormConfig.fields, advancedEventOptionsFormConfig.fields),
  settingsToFormValues: reduceReducers(
    elementFilterFormConfig.settingsToFormValues,
    advancedEventOptionsFormConfig.settingsToFormValues
  ),
  formValuesToSettings: elementFilterFormConfig.formValuesToSettings,
  validate: elementFilterFormConfig.validate
};

export default extensionViewReduxForm(formConfig)(Click);
