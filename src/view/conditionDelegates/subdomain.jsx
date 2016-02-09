import React from 'react';
import Coral from '../reduxFormCoralUI';
import extensionViewReduxForm from '../extensionViewReduxForm';
import RegexToggle from '../components/regexToggle';
import ValidationWrapper from '../components/validationWrapper';
import createID from '../utils/createID';
import MultipleItemEditor from './components/multipleItemEditor';

class Subdomain extends React.Component {
  addRow = () => this.props.fields.subdomains.addField({ id: createID() });
  removeRow = index => this.props.fields.subdomains.removeField(index);
  getKey = subdomain => subdomain.id.value;

  renderItem = subdomain => {
    return (
      <div className="u-inlineBlock">
        <ValidationWrapper
          className="u-gapRight"
          error={subdomain.value.touched && subdomain.value.error}>
          <label>
            <span className="u-label coral-Form-fieldlabel">Subdomain</span>
            <Coral.Textfield {...subdomain.value}/>
          </label>
        </ValidationWrapper>
        <RegexToggle
          value={subdomain.value.value}
          valueIsRegex={subdomain.valueIsRegex.value}
          onValueChange={subdomain.value.onChange}
          onValueIsRegexChange={subdomain.valueIsRegex.onChange}/>
      </div>
    );
  };

  render() {
    const { subdomains } = this.props.fields;

    return (
      <MultipleItemEditor
        items={subdomains}
        renderItem={this.renderItem}
        getKey={this.getKey}
        onAddItem={this.addRow}
        onRemoveItem={this.removeRow}/>
    );

  }
}

const formConfig = {
  fields: [
    'subdomains[].id',
    'subdomains[].value',
    'subdomains[].valueIsRegex'
  ],
  configToFormValues(values, options) {
    values = {
      ...values
    };

    if (!values.subdomains) {
      values.subdomains = [];
    }

    if (!values.subdomains.length) {
      values.subdomains.push({});
    }

    values.subdomains = values.subdomains.map(subdomain => {
      return {
        ...subdomain,
        id: createID()
      };
    });

    return values;
  },
  formValuesToConfig(config, values) {
    config = {
      ...config
    };

    config.subdomains = values.subdomains.map(subdomain => {
      // Don't let ID get into the config since it's only used in the view.
      return {
        value: subdomain.value,
        valueIsRegex: subdomain.valueIsRegex
      };
    });

    return config;
  },
  validate(errors, values) {
    errors = {
      ...errors
    };

    const subdomainsErrors = values.subdomains.map(subdomain => {
      const result = {};

      if (!subdomain.value) {
        result.value = 'Please specify a subdomain.';
      }

      return result;
    });

    errors.subdomains = subdomainsErrors;

    return errors;
  }
};

export default extensionViewReduxForm(formConfig)(Subdomain);
