import React from 'react';

import SpecificElements, { formConfig as specificElementsFormConfig } from './components/specificElements';
import DelayType, { formConfig as delayTypeFormConfig } from './components/delayType';
import extensionViewReduxForm from '../extensionViewReduxForm';
import mergeFormConfigs from '../utils/mergeFormConfigs';

const EntersViewport = ({ fields }) => (
  <div>
    <SpecificElements fields={ fields } />
    <DelayType fields={ fields } />
  </div>
);

const formConfig = mergeFormConfigs(
  specificElementsFormConfig,
  delayTypeFormConfig
);

export default extensionViewReduxForm(formConfig)(EntersViewport);
