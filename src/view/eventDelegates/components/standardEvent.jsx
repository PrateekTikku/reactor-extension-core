import React from 'react';
import Coral from '../../reduxFormCoralUI';
import ElementFilter, { formConfig as elementFilterFormConfig } from './elementFilter';
import AdvancedEventOptions, { formConfig as advancedEventOptionsFormConfig } from './advancedEventOptions';
import extensionViewReduxForm from '../../extensionViewReduxForm';

class StandardEvent extends React.Component {
  render() {
    return (
      <div>
        <ElementFilter ref="elementFilter" fields={this.props.fields}/>
        <AdvancedEventOptions ref="advancedEventOptions" fields={this.props.fields}/>
      </div>
    );
  }
}

const formConfig = {
  fields: elementFilterFormConfig.fields.concat(advancedEventOptionsFormConfig.fields),
  configToFormValues: elementFilterFormConfig.configToFormValues,
  formValuesToConfig: elementFilterFormConfig.formValuesToConfig,
  validate: elementFilterFormConfig.validate
};

export default extensionViewReduxForm(formConfig)(StandardEvent);
