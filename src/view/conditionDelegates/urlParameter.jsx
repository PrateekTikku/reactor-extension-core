import React from 'react';
import Coral from '../reduxFormCoralUI';
import RegexToggle from '../components/regexToggle';
import ValidationWrapper from '../components/validationWrapper';
import extensionViewReduxForm from '../extensionViewReduxForm';

class URLParameter extends React.Component {
  render() {
    const { name, value, valueIsRegex } = this.props.fields;

    return (
      <div>
        <ValidationWrapper className="u-gapRight" error={name.touched && name.error}>
          <span className="u-label">URL Parameter Name:</span>
          <Coral.Textfield {...name}/>
        </ValidationWrapper>
        <ValidationWrapper className="u-gapRight" error={value.touched && value.error}>
          <span className="u-label">URL Parameter Value:</span>
          <Coral.Textfield {...value}/>
        </ValidationWrapper>
        <RegexToggle
          value={value.value}
          valueIsRegex={valueIsRegex.value}
          onValueChange={value.onChange}
          onValueIsRegexChange={valueIsRegex.onChange}/>
      </div>
    );
  }
}

const formConfig = {
  fields: [
    'name',
    'value',
    'valueIsRegex'
  ],
  validate(errors, values) {
    errors = {
      ...errors
    };

    if (!values.name) {
      errors.name = 'Please enter a URL parameter name.';
    }

    if (!values.value) {
      errors.value = 'Please enter a URL parameter value.';
    }

    return errors;
  }
};

export default extensionViewReduxForm(formConfig)(URLParameter);
