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

var replaceTokens = require('@turbine/replace-tokens');
var id = 0;

var isSourceLoadedFromFile = function(action) {
  return action.settings.isExternal;
};

var decorateGlobalJavaScriptCode = function(action, source) {
  return '<scr' + 'ipt>' + source + '</scr' + 'ipt>';
};

var decorateNonGlobalJavaScriptCode = function(action, source) {
  var runScriptFnName = '__runScript' + ++id;

  _satellite[runScriptFnName] = function(fn) {
    fn(action.event, action.relatedElement);
    delete _satellite[runScriptFnName];
  };

  return '<scr' + 'ipt>_satellite["' + runScriptFnName + '"](function(event, target) {' +
    source +
    '});</scr' + 'ipt>';
};

var decorators = {
  javascript: function(action, source) {
    return action.settings.global ?
      decorateGlobalJavaScriptCode(action, source) :
      decorateNonGlobalJavaScriptCode(action, source);
  },
  html: function(action, source) {
    // We need to replace tokens only for sources loaded from external files. The sources from
    // inside the container are automatically taken care by Turbine.
    if (isSourceLoadedFromFile(action)) {
      return replaceTokens(source, action.relatedElement, action.event);
    }

    return source;
  }
};

module.exports = function(action, source) {
  return decorators[action.settings.language](action, source);
};
