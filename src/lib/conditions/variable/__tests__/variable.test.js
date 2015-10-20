'use strict';

var conditionDelegateInjector = require('inject!../variable');
var publicRequire = require('../../../__tests__/helpers/stubPublicRequire')();
var conditionDelegate = conditionDelegateInjector({
  textMatch: publicRequire('textMatch')
});

describe('variable condition delegate', function() {
  var previousGetVar;

  beforeAll(function() {
    window._satellite = window._satellite || {};
    previousGetVar = window._satellite.getVar;
    window._satellite.getVar = function() {
      return 'foo';
    };
  });

  afterAll(function() {
    window._satellite.getVar = previousGetVar;
  });

  it('returns true when the variable matches the string value', function() {
    var config = { name: 'test', value: 'foo' };
    expect(conditionDelegate(config)).toBe(true);
  });

  it('returns false when the variable does not match the string value', function() {
    var config = { name: 'test', value: 'cake' };
    expect(conditionDelegate(config)).toBe(false);
  });

  it('returns true when the variable matches the regex value', function() {
    var config = { name: 'test', value: /f.o/i };
    expect(conditionDelegate(config)).toBe(true);
  });

  it('returns false when the variable does not match the regex value', function() {
    var config = { name: 'test', value: /g.o/i };
    expect(conditionDelegate(config)).toBe(false);
  });
});
