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

'use strict';

var getDataElementValue = require('@turbine/get-data-element-value');

var POLL_INTERVAL = 1000;

var triggersByName = {};
var cachedStringifiedValueByName = {};

setInterval(function() {
  Object.keys(triggersByName).forEach(function(name) {
    var stringifiedValue = JSON.stringify(getDataElementValue(name));

    if (stringifiedValue !== cachedStringifiedValueByName[name]) {
      var pseudoEvent = {
        type: 'dataelementchange(' + name + ')',
        target: document
      };

      triggersByName[name].forEach(function(trigger) {
        trigger(document, pseudoEvent);
      });

      cachedStringifiedValueByName[name] = stringifiedValue;
    }
  });
}, POLL_INTERVAL);

module.exports = function(settings, trigger) {
  var name = settings.name;
  var triggers = triggersByName[name];

  if (!triggers) {
    triggers = triggersByName[name] = [];
    cachedStringifiedValueByName[name] = JSON.stringify(getDataElementValue(name));
  }

  triggers.push(trigger);
};
