import React from 'react';
import Coral from '../../reduxFormCoralUI';
import ElementFilter, {
  fields as elementFilterFields,
  reducers as elementFilterReducers
} from './elementFilter';
import AdvancedEventOptions, {
  fields as advancedEventOptionsFields
} from './advancedEventOptions';
import extensionViewReduxForm from '../../extensionViewReduxForm';
import reduceReducers from 'reduce-reducers';

class StandardEvent extends React.Component {
  render() {
    return (
      <div>
        <ElementFilter {...this.props.fields}/>
        <AdvancedEventOptions {...this.props.fields}/>
      </div>
    );
  }
}

const fields = elementFilterFields.concat(advancedEventOptionsFields);

const validate = values => elementFilterReducers.validate({}, values);

export default extensionViewReduxForm({
  fields,
  validate
})(StandardEvent);

export const reducers = elementFilterReducers;
