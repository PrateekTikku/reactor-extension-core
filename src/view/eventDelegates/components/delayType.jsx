import React from 'react';
import ReactDOM from 'react-dom';
import Coral from '../../reduxFormCoralUI';
import ValidationWrapper from '../../components/validationWrapper';

export default class DelayType extends React.Component {
  onDelayTypeClick = () => {
    ReactDOM.findDOMNode(this.refs.delayTextField).focus();
  };

  onDelayFieldClick = () => {
    this.refs.delayRadio.props.onChange("delay");
  };

  render() {
    const { delayType, delay } = this.props;

    return (
      <div>
        <label>
          <span className="u-label u-gapRight">Trigger</span>
        </label>
        <Coral.Radio
          ref="immediatelyRadio"
          {...delayType}
          value="immediately"
          checked={delayType.value === 'immediately'}>
          immediately
        </Coral.Radio>
        <Coral.Radio
          ref="delayRadio"
          {...delayType}
          value="delay"
          checked={delayType.value === 'delay'}
          onClick={this.onDelayTypeClick}>
          after
        </Coral.Radio>
        <ValidationWrapper
          ref="delayValidationWrapper"
          error={delay.touched && delay.error}>
          <Coral.Textfield
            ref="delayTextField"
            {...delay}
            onClick={this.onDelayFieldClick}/>
        </ValidationWrapper>
        <label>
          <span className="u-label u-gapLeft">milliseconds</span>
        </label>
      </div>
    )
  }
}

export const fields = [
  'delayType',
  'delay'
];

export const reducers = {
  configToFormValues(values, options) {
    return {
      ...values,
      delayType: options.config.delay ? 'delay' : 'immediately',
      delay: options.config.delay
    };
  },
  formValuesToConfig(config, values) {
    config = {
      ...config
    };

    if (values.delayType === 'delay') {
      config.delay = Number(values.delay);
    }

    delete config.delayType;
    return config;
  },
  validate(errors, values) {
    errors = {
      ...errors
    };

    if ((values.delayType === 'delay' && !values.delay) || isNaN(values.delay)) {
      errors.delay = 'Please specify a number';
    }

    return errors;
  }
};
