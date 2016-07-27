import React from 'react';
import CheckboxList from '../components/checkboxList';
import extensionViewReduxForm from '../extensionViewReduxForm';

const browserOptions = [
  'Chrome',
  'Firefox',
  'IE',
  'Safari',
  'Opera',
  'Mobile Safari',
  'IE Mobile',
  'IE Mobile',
  'Opera Mini',
  'Opera Mobile',
  'OmniWeb'
];

const Browser = ({ ...props }) => {
  const { browsers } = props.fields;
  return <CheckboxList options={ browserOptions } { ...browsers } />;
};

const formConfig = {
  fields: ['browsers'],
  formValuesToSettings(settings, values) {
    return {
      browsers: values.browsers || [] // An array is required.
    };
  }
};

export default extensionViewReduxForm(formConfig)(Browser);

