import React from 'react';
import Coral from '../../reduxFormCoralUI';
import DisclosureButton from '../../components/disclosureButton';

export let fields = [
  'bubbleFireIfParent',
  'bubbleFireIfChildFired',
  'bubbleStop'
];

export default class AdvancedEventOptions extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false
    }
  }

  setExpanded = value => {
    this.setState({
      expanded: value
    });
  };
  render() {
    const { bubbleFireIfParent, bubbleFireIfChildFired, bubbleStop } = this.props;

    var advancedPanel;

    if (this.state.expanded) {
      advancedPanel = (
        <div>
          <h4 className="coral-Heading coral-Heading--4">Bubbling</h4>

          <Coral.Checkbox
            className="u-block"
            {...bubbleFireIfParent}>Run this rule even when the event originates from a descendant element</Coral.Checkbox>
          <Coral.Checkbox
            className="u-block"
            {...bubbleFireIfChildFired}>Allow this rule to run even if the event already triggered a rule targeting a descendant element</Coral.Checkbox>
          <Coral.Checkbox
            className="u-block"
            {...bubbleStop}>After the rule runs, prevent the event from triggering rules targeting ancestor elements</Coral.Checkbox>
        </div>
      );
    }

    return (
      <div ref="niner">
        <div className="AdvancedEventOptions-disclosureButtonContainer">
          <DisclosureButton
            label="Advanced"
            selected={this.state.expanded}
            setSelected={this.setExpanded}/>
        </div>
        {advancedPanel}
      </div>
    );
  }
}
