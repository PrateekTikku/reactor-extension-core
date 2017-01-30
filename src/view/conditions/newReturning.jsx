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

import React from 'react';
import Radio from '@coralui/redux-form-react-coral/lib/Radio';
import { Field } from 'redux-form';

import extensionViewReduxForm from '../extensionViewReduxForm';

const NewReturning = () => (
  <div>
    <Field
      name="visitorType"
      component={ Radio }
      type="radio"
      value="new"
    >
      New Visitor
    </Field>
    <Field
      name="visitorType"
      component={ Radio }
      type="radio"
      value="returning"
    >
      Returning Visitor
    </Field>
  </div>
);

const formConfig = {
  settingsToFormValues(values, settings, state) {
    return {
      ...values,
      visitorType: state.meta.isNew || settings.isNewVisitor ? 'new' : 'returning'
    };
  },
  formValuesToSettings(settings, values) {
    return {
      ...settings,
      isNewVisitor: values.visitorType === 'new'
    };
  }
};

export default extensionViewReduxForm(formConfig)(NewReturning);
