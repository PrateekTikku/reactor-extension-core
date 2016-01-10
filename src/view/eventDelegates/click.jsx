import React from 'react';
import Coral from '../reduxFormCoralUI';
import ElementFilter, {
  fields as elementFilterFields,
  reducers as elementFilterReducers
} from './components/elementFilter';
import AdvancedEventOptions, {
  fields as advancedEventOptionsFields
} from './components/advancedEventOptions';
import extensionReduxForm from '../extensionReduxForm';
import reduceReducers from 'reduce-reducers';

const fields = [
  'delayLinkActivation'
]
.concat(elementFilterFields)
.concat(advancedEventOptionsFields);

export class Click extends React.Component {
  render() {
    const { fields: { delayLinkActivation } } = this.props;

    return (
      <div>
        <ElementFilter {...this.props.fields}/>
        <Coral.Checkbox
          class="u-block"
          {...delayLinkActivation}>
          If the element is a link, delay navigation until rule runs
        </Coral.Checkbox>
        <AdvancedEventOptions {...this.props.fields}/>
      </div>
    );
  }
}

let validate = values => elementFilterReducers.validate({}, values);

export default extensionReduxForm({
  fields,
  validate
})(Click);

export let reducers = elementFilterReducers;
