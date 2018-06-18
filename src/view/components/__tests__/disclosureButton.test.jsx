/***************************************************************************************
 * (c) 2017 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 ****************************************************************************************/

import React from 'react';
import { mount } from 'enzyme';
import ChevronDown from '@react/react-spectrum/Icon/ChevronDown';
import ChevronRight from '@react/react-spectrum/Icon/ChevronRight';
import DisclosureButton from '../disclosureButton';

const getReactComponents = (wrapper) => {
  wrapper.update();
  const chevronDownIcon = wrapper.find(ChevronDown);
  const chevronRightIcon = wrapper.find(ChevronRight);
  const buttonWrapper = wrapper.find('button');

  return {
    chevronDownIcon,
    chevronRightIcon,
    buttonWrapper
  };
};

const render = props => mount(<DisclosureButton { ...props } />);

const isIE = () => {
  const myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') !== -1) ? parseInt(myNav.split('msie')[1], 10) : false;
};

describe('disclosure button', () => {
  if (!isIE() || isIE() > 10) {
    it('shows down chevron when selected', () => {
      const {
        chevronDownIcon,
        chevronRightIcon
      } = getReactComponents(render({
        selected: true
      }));

      expect(chevronDownIcon.exists()).toBe(true);
      expect(chevronRightIcon.exists()).toBe(false);
    });

    it('shows right chevron when not selected', () => {
      const {
        chevronDownIcon,
        chevronRightIcon
      } = getReactComponents(render({
        selected: false
      }));

      expect(chevronDownIcon.exists()).toBe(false);
      expect(chevronRightIcon.exists()).toBe(true);
    });

    it('calls onClick when clicked', () => {
      const onClick = jasmine.createSpy();
      const { buttonWrapper } = getReactComponents(render({
        onClick
      }));

      buttonWrapper.simulate('click');

      expect(onClick).toHaveBeenCalled();
    });
  }
});
