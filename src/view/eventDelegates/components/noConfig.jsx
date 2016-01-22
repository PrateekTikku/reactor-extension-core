import React from 'react';
import Coral from 'coralui-support-react';
import extensionViewReduxForm from '../../extensionViewReduxForm';

export class NoConfig extends React.Component {
  render() {
    return (
      <Coral.Alert>
        <Coral.Alert.Header>INFO</Coral.Alert.Header>
        <Coral.Alert.Content>This delegate doesn't have any configuration properties.</Coral.Alert.Content>
      </Coral.Alert>
    );
  }
}

const fields = [];

export default extensionViewReduxForm({
  fields
})(NoConfig);
