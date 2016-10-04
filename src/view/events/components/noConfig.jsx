import React from 'react';
import Alert from '@coralui/react-coral/lib/Alert';

import extensionViewReduxForm from '../../extensionViewReduxForm';

const NoConfig = () => (
  <Alert header="INFO">
    This delegate doesn't have any configuration properties.
  </Alert>
);

const formConfig = {
  settingsToFormValues(values, settings) {
    return {
      ...values,
      ...settings
    };
  },
  formValuesToSettings(settings, values) {
    return {
      ...settings,
      ...values
    };
  }
};

export default extensionViewReduxForm(formConfig)(NoConfig);
