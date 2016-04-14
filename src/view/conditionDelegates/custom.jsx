import React from 'react';
import Coral from '@coralui/coralui-support-reduxform';
import { ErrorTip } from '@reactor/react-components';
import customScriptWrapping from '../utils/customScriptWrapping';

import extensionViewReduxForm from '../extensionViewReduxForm';

const WRAPPING_FUNCTION_PARAMS = [
  'event',
  'target'
];

class Custom extends React.Component {
  onOpenEditor = () => {
    let scriptField = this.props.fields.script;
    window.extensionBridge.openCodeEditor(scriptField.value, scriptField.onChange);
  };

  render() {
    let script = this.props.fields.script;

    return (
      <div>
        <Coral.Button ref="openEditorButton" icon="code" onClick={this.onOpenEditor}>
          Open Editor
        </Coral.Button>
        {script.touched && script.error ?
          <ErrorTip ref="scriptErrorIcon" message={script.error}/> : null
        }
        <Coral.Icon icon="infoCircle" className="u-inline-tooltip u-gapLeft"/>
        <Coral.Tooltip className="u-tooltipMaxWidth" placement="right" target="_prev">
          Enter a script that must evaluate true/false to control whether this rule executes.
          Use this field to check for certain values like shopping cart size or item price,
          whether a user is logged in or registered, or anything else you can dream up.
        </Coral.Tooltip>
      </div>
    );
  }
}

const formConfig = {
  fields: ['script'],
  settingsToFormValues(values, options) {
    values = {
      ...values
    };

    if (options.settings.script) {
      values.script = customScriptWrapping.unwrap(
        options.settings.script, WRAPPING_FUNCTION_PARAMS);
    }

    return values;
  },
  formValuesToSettings(settings, values) {
    settings = {
      ...settings
    };

    if (values.script) {
      settings.script = customScriptWrapping.wrap(values.script, WRAPPING_FUNCTION_PARAMS);
    }

    return settings;
  },
  validate(errors, values) {
    errors = {
      ...errors
    };

    if (!values.script) {
      errors.script = 'Please provide custom script.';
    }

    return errors;
  }
};

export default extensionViewReduxForm(formConfig)(Custom);
