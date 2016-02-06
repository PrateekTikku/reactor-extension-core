import React from 'react';
import Coral from '../reduxFormCoralUI';
import extensionViewReduxForm from '../extensionViewReduxForm';

export class NewReturning extends React.Component {
  render() {
    const { visitorType } = this.props.fields;

    return (
      <div>
        <Coral.Radio
          {...visitorType}
          value="new"
          checked={visitorType.value === 'new'}>
          New Visitor
        </Coral.Radio>
        <Coral.Radio
          {...visitorType}
          value="returning"
          checked={visitorType.value === 'returning'}>
          Returning Visitor
        </Coral.Radio>
      </div>
    );
  }
}

const fields = [
  'visitorType'
];

export default extensionViewReduxForm({
  fields
})(NewReturning);

export const reducers = {
  configToFormValues(values, options) {
    return {
      visitorType: options.configIsNew || options.config.isNewVisitor ? 'new' : 'returning'
    };
  },
  formValuesToConfig(config, values) {
    return {
      isNewVisitor: values.visitorType === 'new'
    };
  }
};
