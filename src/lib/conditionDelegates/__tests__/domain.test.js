'use strict';

var mockDocument = {
  location: {
    hostname: 'foo.adobe.com'
  }
};

var conditionDelegateInjector = require('inject!../domain');
var conditionDelegate = conditionDelegateInjector({
  document: mockDocument
});

var getConfig = function(domains) {
  return {
    domains: domains
  };
};

describe('domain condition delegate', function() {
  it('returns true when the domain matches', function() {
    var config = getConfig(['example\.com$', 'Adobe\.com$']);
    expect(conditionDelegate(config)).toBe(true);
  });

  it('returns false when the domain does not match', function() {
    var config = getConfig(['example\.com$', 'yahoo\.com$']);
    expect(conditionDelegate(config)).toBe(false);
  });
});
