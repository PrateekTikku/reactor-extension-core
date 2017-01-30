/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2016 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by all applicable intellectual property
* laws, including trade secret and copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/

import { mount } from 'enzyme';
import ErrorTip from '@reactor/react-components/lib/errorTip';
import { Field } from 'redux-form';
import Textfield from '@coralui/react-coral/lib/Textfield';
import Checkbox from '@coralui/react-coral/lib/Checkbox';
import Select from '@coralui/react-coral/lib/Select';
import AdvancedEventOptions from '../components/advancedEventOptions';
import TimePlayed from '../timePlayed';
import { getFormComponent, createExtensionBridge } from '../../__tests__/helpers/formTestUtils';

const getReactComponents = (wrapper) => {
  const fields = wrapper.find(Field);

  const amountField = fields.filterWhere(n => n.prop('name') === 'amount');
  const amountTextfield = amountField.find(Textfield).node;
  const amountErrorTip = amountField.find(ErrorTip).node;
  const unitSelect = wrapper.find(Select).node;
  const elementSelectorField = fields.filterWhere(n => n.prop('name') === 'elementSelector');
  const elementSelectorTextfield = elementSelectorField.find(Textfield).node;
  const elementSelectorErrorTip = elementSelectorField.find(ErrorTip).node;
  const bubbleStopCheckbox =
    wrapper.find(Checkbox).filterWhere(n => n.prop('name') === 'bubbleStop').node;
  const advancedEventOptions = wrapper.find(AdvancedEventOptions).node;

  return {
    amountTextfield,
    amountErrorTip,
    unitSelect,
    elementSelectorTextfield,
    elementSelectorErrorTip,
    bubbleStopCheckbox,
    advancedEventOptions
  };
};

describe('time played view', () => {
  let extensionBridge;
  let instance;

  beforeEach(() => {
    extensionBridge = createExtensionBridge();
    instance = mount(getFormComponent(TimePlayed, extensionBridge));
  });

  it('sets form values from settings', () => {
    extensionBridge.init({
      settings: {
        elementSelector: '.foo',
        amount: 55,
        unit: 'percent',
        bubbleStop: true
      }
    });

    const { advancedEventOptions } = getReactComponents(instance);
    advancedEventOptions.toggleSelected();

    const {
      amountTextfield,
      unitSelect,
      elementSelectorTextfield,
      bubbleStopCheckbox
    } = getReactComponents(instance);

    expect(amountTextfield.props.value).toBe(55);
    expect(unitSelect.props.value).toBe('percent');
    expect(elementSelectorTextfield.props.value).toBe('.foo');
    expect(bubbleStopCheckbox.props.value).toBe(true);
  });

  it('sets settings from form values', () => {
    extensionBridge.init();

    const {
      amountTextfield,
      elementSelectorTextfield,
      advancedEventOptions
    } = getReactComponents(instance);

    amountTextfield.props.onChange(45);
    elementSelectorTextfield.props.onChange('.foo');

    advancedEventOptions.toggleSelected();
    const { bubbleStopCheckbox } = getReactComponents(instance);
    bubbleStopCheckbox.props.onChange(true);

    const { amount, unit, elementSelector, bubbleStop } = extensionBridge.getSettings();
    expect(amount).toBe(45);
    expect(unit).toBe('second');
    expect(elementSelector).toBe('.foo');
    expect(bubbleStop).toBe(true);
  });

  it('sets validation errors', () => {
    extensionBridge.init();

    expect(extensionBridge.validate()).toBe(false);

    const { amountErrorTip, elementSelectorErrorTip } = getReactComponents(instance);

    expect(amountErrorTip).toBeDefined();
    expect(elementSelectorErrorTip).toBeDefined();
  });
});
