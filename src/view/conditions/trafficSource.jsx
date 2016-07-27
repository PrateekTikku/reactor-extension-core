import React from 'react';
import Textfield from '@coralui/react-coral/lib/Textfield';
import extensionViewReduxForm from '../extensionViewReduxForm';
import RegexToggle from '../components/regexToggle';
import { ValidationWrapper } from '@reactor/react-components';

const TrafficSource = ({ ...props }) => {
  const { source, sourceIsRegex } = props.fields;

  return (
    <div>
      <ValidationWrapper
        className="u-gapRight"
        error={ source.touched && source.error }
      >
        <label>
          <span className="u-label">Traffic Source</span>
          <Textfield { ...source } />
        </label>
      </ValidationWrapper>
      <RegexToggle
        value={ source.value }
        valueIsRegex={ sourceIsRegex.value }
        onValueChange={ source.onChange }
        onValueIsRegexChange={ sourceIsRegex.onChange }
      />
    </div>
  );
};

const formConfig = {
  fields: [
    'source',
    'sourceIsRegex'
  ],
  validate(errors, values) {
    errors = {
      ...errors
    };

    if (!values.source) {
      errors.source = 'Please specify a traffic source.';
    }

    return errors;
  }
};

export default extensionViewReduxForm(formConfig)(TrafficSource);
