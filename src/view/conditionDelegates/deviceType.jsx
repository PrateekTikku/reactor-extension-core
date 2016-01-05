import React from 'react';
import Coral from 'coralui-support-react';
import { connect } from 'react-redux';
import { actionCreators } from './actions/deviceTypeActions'
import CheckboxList from '../components/checkboxList';

export let mapStateToProps = state => ({
  deviceTypes: state.get('deviceTypes')
});

const DEVICE_TYPES = [
  'Desktop',
  'iPhone',
  'iPad',
  'iPod',
  'Nokia',
  'Windows Phone',
  'Blackberry',
  'Android'
];

export class DeviceType extends React.Component {
  select = deviceType => {
    let deviceTypes = this.props.deviceTypes.push(deviceType);
    this.props.dispatch(actionCreators.setDeviceTypes(deviceTypes));
  };

  deselect = deviceType => {
    let index = this.props.deviceTypes.indexOf(deviceType);
    let deviceTypes = this.props.deviceTypes.delete(index);
    this.props.dispatch(actionCreators.setDeviceTypes(deviceTypes));
  };

  render() {
    return <CheckboxList
      items={DEVICE_TYPES}
      selectedValues={this.props.deviceTypes}
      select={this.select}
      deselect={this.deselect}/>
  }
}

export default connect(mapStateToProps)(DeviceType);
