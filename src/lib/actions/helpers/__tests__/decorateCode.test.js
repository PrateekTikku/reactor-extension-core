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

var decorateCode = require('../decorateCode');
var id = 1;

describe('decorate code', function() {
  var mockTurbine;

  beforeEach(function() {
    mockTurbine = {
      replaceTokens: jasmine.createSpy().and.callFake(function(token) {
        return token.replace(/%(.+?)%/g, function(token, variableName) {
          return 'replaced - ' + variableName;
        });
      })
    };

    mockTurbineVariable(mockTurbine);
  });

  afterEach(function() {
    resetTurbineVariable();
  });

  it('decorates javascript action', function() {
    var settings = {
      language: 'javascript',
      source: 'console.log("logging")'
    };

    var decoratedCode = decorateCode({
      settings: settings,
      event: {}
    }, settings.source);

    var newId = id++;

    expect(decoratedCode).toBe(
      '<script>_satellite["__runScript' + newId + '"]' +
      '(function(event, target) {\nconsole.log("logging")\n});' +
      '</script>'
    );
  });

  it('sends the event and target to the random generated method for a javascript action',
    function() {
      var event = {
        element: {},
        target: {}
      };
      var settings = {
        language: 'javascript',
        source: 'console.log("logging")'
      };
      var spy = jasmine.createSpy('fn');
      var newId = id++;

      decorateCode({
        settings: settings,
        event: event
      }, settings.source);

      _satellite['__runScript' + newId](spy);

      expect(spy.calls.mostRecent()).toEqual({
        object: event.element,
        args: [
          event,
          event.target
        ],
        invocationOrder: jasmine.any(Number),
        returnValue: undefined
      });
    });

  it('clears the random generated method for a javascript action after its execution',
    function() {
      var settings = {
        language: 'javascript',
        source: 'console.log("logging")'
      };
      var newId = id++;

      decorateCode({
        settings: settings,
        event: {},
        relatedElement: {}
      }, settings.source);


      expect(_satellite['__runScript' + newId]).toBeDefined();
      _satellite['__runScript' + newId](function() {});
      expect(_satellite['__runScript' + newId]).not.toBeDefined();
    });


  it('decorates global javascript action', function() {
    var settings = {
      language: 'javascript',
      global: true,
      source: 'console.log("logging")'
    };

    var decoratedCode = decorateCode({
      settings: settings,
      event: {},
      relatedElement: {}
    }, settings.source);

    expect(decoratedCode).toBe('<script>\nconsole.log("logging")\n</script>');
  });

  it('decorates html action', function() {
    var settings = {
      language: 'html',
      global: true,
      source: '<script>console.log("logging")</script>'
    };

    var decoratedCode = decorateCode({
      settings: settings,
      event: {},
      relatedElement: {}
    }, settings.source);

    expect(decoratedCode).toBe('<script>console.log("logging")</script>');
  });

  it('does not replace data element tokens for an embedded html action', function() {
    var settings = {
      language: 'html',
      global: true,
      source: '<div>%productname%</div>'
    };

    var decoratedCode = decorateCode({
      settings: settings,
      event: {},
      relatedElement: {}
    }, settings.source);

    expect(decoratedCode).toBe('<div>%productname%</div>');
  });


  it('does not replace data element tokens for an embedded html action', function() {
    var settings = {
      language: 'html',
      global: true,
      source: '<div>productname</div>'
    };

    decorateCode({
      settings: settings,
      event: {},
      relatedElement: {}
    }, settings.source);

    expect(mockTurbine.replaceTokens).not.toHaveBeenCalled();
  });

  it('does replace data element tokens for an html action loaded from a file', function() {
    var settings = {
      language: 'html',
      global: true,
      source: 'url1',
      isExternal: true
    };

    var decoratedAction = decorateCode({
      settings: settings,
      event: {},
      relatedElement: {}
    }, '<div>%productname%</div>');

    expect(decoratedAction).toBe('<div>replaced - productname</div>');
  });
});
