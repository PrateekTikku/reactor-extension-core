import React from 'react';
import Coral from '../reduxFormCoralUI';
import extensionViewReduxForm from '../extensionViewReduxForm';
import ValidationWrapper from '../components/validationWrapper';
import ComparisonOperatorField from './components/comparisonOperatorField';

class Sessions extends React.Component {
  render() {
    const { operator, count } = this.props.fields;

    return (
      <div>
        <div>
          <label className="u-gapRight">
            <span className="u-label">The user's number of sessions is</span>
            <ComparisonOperatorField {...operator}/>
          </label>
          <ValidationWrapper error={count.touched && count.error}>
            <label>
              <span className="u-label">the value</span>
              <Coral.Textfield {...count}/>
            </label>
          </ValidationWrapper>
        </div>
      </div>
    );
  }
}

const formConfig = {
  fields: [
    'operator',
    'count'
  ],
  configToFormValues(values, options) {
    return {
      ...values,
      operator: options.config.operator || '>'
    };
  },
  formValuesToConfig(config, values) {
    return {
      ...config,
      count: Number(values.count)
    };
  },
  validate(errors, values) {
    errors = {
      ...errors
    };

    if (!values.count || isNaN(values.count)) {
      errors.count = 'Please specify a number of sessions.';
    }

    return errors;
  }
};

export default extensionViewReduxForm(formConfig)(Sessions);
