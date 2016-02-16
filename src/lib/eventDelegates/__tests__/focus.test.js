'use strict';

describe('focus event type', function() {
  var testStandardEvent = require('./helpers/testStandardEvent');
  var publicRequire = require('../../__tests__/helpers/stubPublicRequire')();
  var delegateInjector = require('inject!../focus');
  var delegate = delegateInjector({
    getExtension: publicRequire('getExtension')
  });

  testStandardEvent(delegate, 'focus');
});
