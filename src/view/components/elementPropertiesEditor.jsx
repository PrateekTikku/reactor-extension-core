import React from 'react';
import Coral from 'coralui-support-react';
import ElementPropertyEditor from '../components/elementPropertyEditor';
import {stateStream} from '../store';
import createID from '../utils/createID';
import {List, Map} from 'immutable';
import actions from '../actions/elementPropertiesActions';

export default React.createClass({
  itemIdIncrementor: 0,

  getInitialState: function() {
    return {
      elementProperties: List()
    };
  },

  componentDidMount: function() {
    this.unsubscribe = stateStream
      .map(function(state) {
        return {
          elementProperties: state.get('config').get('elementProperties')
        };
      })
      .assign(this, 'setState');
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  add: function() {
    actions.add.push({
      name: '',
      value: ''
    });
  },

  setName: function(elementProperty, name) {
    actions.setName.push({
      elementProperty,
      name
    });
  },

  setValue: function(elementProperty, value) {
    actions.setValue.push({
      elementProperty,
      value
    });
  },

  remove: function(elementProperty) {
    actions.remove.push(elementProperty);
  },

  render: function() {
    return (
      <div>
        <span className="u-italic">and having the following property values</span>
        {this.state.elementProperties.map(property => {
          return <ElementPropertyEditor
            key={property.get('id')}
            name={property.get('name')}
            value={property.get('value')}
            setName={this.setName.bind(null, property)}
            setValue={this.setValue.bind(null, property)}
            remove={this.remove.bind(null, property)}
            removable={this.state.elementProperties.size > 1}
            />
        })}
        <Coral.Button onClick={this.add}>Add</Coral.Button>
      </div>
    );
  }
});
