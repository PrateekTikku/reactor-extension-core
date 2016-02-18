import React from 'react';
import Coral from '../reduxFormCoralUI';
import extensionViewReduxForm from '../extensionViewReduxForm';
import RegexToggle from '../components/regexToggle';
import ValidationWrapper from '../components/validationWrapper';
import createId from '../utils/createId';
import MultipleItemEditor from './components/multipleItemEditor';

class Path extends React.Component {
  addRow = () => this.props.fields.paths.addField({ id: createId() });
  removeRow = index => this.props.fields.paths.removeField(index);
  getKey = path => path.id.value;

  renderItem = (path, index) => {
    return (
      <div className="u-inlineBlock">
        <ValidationWrapper
          ref={`pathWrapper${index}`}
          className="u-gapRight"
          error={path.value.touched && path.value.error}>
          <label>
            <span className="u-label coral-Form-fieldlabel">Path</span>
            <Coral.Textfield ref={`pathField${index}`} {...path.value}/>
          </label>
        </ValidationWrapper>
        <RegexToggle
          ref={`pathRegexToggle${index}`}
          value={path.value.value}
          valueIsRegex={path.valueIsRegex.value}
          onValueChange={path.value.onChange}
          onValueIsRegexChange={path.valueIsRegex.onChange}/>
      </div>
    );
  };

  render() {
    const { paths } = this.props.fields;

    return (
      <MultipleItemEditor
        ref="multipleItemEditor"
        items={paths}
        renderItem={this.renderItem}
        getKey={this.getKey}
        onAddItem={this.addRow}
        onRemoveItem={this.removeRow}/>
    );

  }
}

const formConfig = {
  fields: [
    'paths[].id',
    'paths[].value',
    'paths[].valueIsRegex'
  ],
  settingsToFormValues(values, options) {
    values = {
      ...values
    };

    if (!values.paths) {
      values.paths = [];
    }

    if (!values.paths.length) {
      values.paths.push({});
    }

    values.paths = values.paths.map(path => {
      return {
        ...path,
        id: createId()
      };
    });

    return values;
  },
  formValuesToSettings(settings, values) {
    settings = {
      ...settings
    };

    settings.paths = values.paths.map(path => {
      // Don't let ID get into the settings since it's only used in the view.
      return {
        value: path.value,
        valueIsRegex: path.valueIsRegex
      };
    });

    return settings;
  },
  validate(errors, values) {
    errors = {
      ...errors
    };

    const pathsErrors = values.paths.map(path => {
      const result = {};

      if (!path.value) {
        result.value = 'Please specify a path.';
      }

      return result;
    });

    errors.paths = pathsErrors;

    return errors;
  }
};

export default extensionViewReduxForm(formConfig)(Path);
