import React from 'react';

import SpecificElements, { formConfig as specificElementsFormConfig } from './components/specificElements';
import DelayType, { formConfig as delayTypeFormConfig } from './components/delayType';
import extensionViewReduxForm from '../extensionViewReduxForm';
import mergeFormConfigs from '../utils/mergeFormConfigs';

const EntersViewport = ({ ...props }) => (
  <div>
    <SpecificElements fields={ props.fields } />
    <DelayType fields={ props.fields } />
  </div>
);

const formConfig = mergeFormConfigs(
  specificElementsFormConfig,
  delayTypeFormConfig
);

export default extensionViewReduxForm(formConfig)(EntersViewport);
