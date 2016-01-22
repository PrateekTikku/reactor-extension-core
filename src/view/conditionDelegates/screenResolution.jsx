import React from 'react';
import Coral from '../reduxFormCoralUI';
import extensionViewReduxForm from '../extensionViewReduxForm';
import ValidationWrapper from '../components/validationWrapper';
import ComparisonOperatorField from './components/comparisonOperatorField';

export class ScreenResolution extends React.Component {
  render() {
    const { widthOperator, width, heightOperator, height } = this.props.fields;

    return (
      <div>
        <div>
          <label className="u-gapRight">
            <span className="u-label">The user's screen resolution width is</span>
            <ComparisonOperatorField {...widthOperator}/>
          </label>
          <ValidationWrapper error={width.touched && width.error}>
            <label>
              <Coral.Textfield className="u-gapRight" {...width}/>
              <span>px</span>
            </label>
          </ValidationWrapper>
        </div>
        <div className="u-gapTop">
          <label className="u-gapRight">
            <span className="u-label">and height is</span>
            <ComparisonOperatorField {...heightOperator}/>
          </label>
          <ValidationWrapper error={height.touched && height.error}>
            <label>
              <Coral.Textfield className="u-gapRight" {...height}/>
              <span>px</span>
            </label>
          </ValidationWrapper>
        </div>
      </div>
    );
  }
}

const fields = [
  'widthOperator',
  'width',
  'heightOperator',
  'height'
];

const validate = values => {
  const errors = {};

  if (!values.width || isNaN(values.width)) {
    errors.width = 'Please specify a number for width.';
  }

  if (!values.height || isNaN(values.height)) {
    errors.height = 'Please specify a number for height.';
  }

  return errors;
};

export default extensionViewReduxForm({
  fields,
  validate
})(ScreenResolution);

export const reducers = {
  configToFormValues(values, options) {
    values = {
      ...values
    };

    if (!options.config.widthOperator) {
      values.widthOperator = '>'
    }

    if (!options.config.heightOperator) {
      values.heightOperator = '>'
    }

    return values;
  },
  formValuesToConfig(config, values) {
    return {
      ...config,
      width: Number(values.width),
      height: Number(values.height)
    };
  }
};
