import React from 'react';
import Coral from '../reduxFormCoralUI';
import extensionViewReduxForm from '../extensionViewReduxForm';
import ValidationWrapper from '../components/validationWrapper';
import ComparisonOperatorField from './components/comparisonOperatorField';

class PageViews extends React.Component {
  render() {
    const { operator, count, duration } = this.props.fields;

    return (
      <div>
        <div>
          <label className="u-gapRight">
            <span className="u-label">The user's number of page views is</span>
            <ComparisonOperatorField ref="operatorField" {...operator}/>
          </label>
          <ValidationWrapper ref="countWrapper" error={count.touched && count.error}>
            <label>
              <span className="u-label">the value</span>
              <Coral.Textfield ref="countField" {...count}/>
            </label>
          </ValidationWrapper>
        </div>
        <div>
          <Coral.Radio
            ref="lifetimeRadio"
            {...duration}
            value="lifetime"
            checked={duration.value === 'lifetime'}>
            Lifetime
          </Coral.Radio>
          <Coral.Radio
            ref="sessionRadio"
            {...duration}
            value="session"
            checked={duration.value === 'session'}>
            Current Session
          </Coral.Radio>
        </div>
      </div>
    );
  }
}

const formConfig = {
  fields: [
    'operator',
    'count',
    'duration'
  ],
  configToFormValues(values, options) {
    return {
      ...values,
      operator: options.config.operator || '>',
      duration: options.config.duration || 'lifetime'
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
      errors.count = 'Please specify a number of page views.';
    }

    return errors;
  }
};

export default extensionViewReduxForm(formConfig)(PageViews);
