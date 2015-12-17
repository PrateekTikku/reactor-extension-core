'use strict';

describe('blur event type', function() {
  var testStandardEvent = require('./helpers/testStandardEvent');
  var publicRequire = require('../../__tests__/helpers/stubPublicRequire')();
  var delegateInjector = require('inject!../blur');
  var delegate = delegateInjector({
    resourceProvider: publicRequire('resourceProvider')
  });

  testStandardEvent(delegate, 'blur');
});
