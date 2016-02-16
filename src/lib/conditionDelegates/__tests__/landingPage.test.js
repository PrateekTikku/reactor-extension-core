'use strict';

var mockVisitorTracking = {
  getLandingPage: function() {
    return 'http://landingpage.com/test.html';
  },
  enable: jasmine.createSpy()
};

var conditionDelegateInjector = require('inject!../landingPage');
var publicRequire = require('../../__tests__/helpers/stubPublicRequire')({
  resourceStubs: {
    'dtm/resources/visitorTracking': mockVisitorTracking
  }
});
var conditionDelegate = conditionDelegateInjector({
  textMatch: publicRequire('textMatch'),
  getExtension: publicRequire('getExtension')
});

var getConfig = function(page, pageIsRegex) {
  return {
    page: page,
    pageIsRegex: pageIsRegex
  };
};

describe('landing page condition delegate', function() {
  it('calls visitorTracking.enable', function() {
    expect(mockVisitorTracking.enable).toHaveBeenCalled();
  });

  it('returns true when the landing page matches a string', function() {
    var config = getConfig('http://landingpage.com/test.html', false);
    expect(conditionDelegate(config)).toBe(true);
  });

  it('returns false when the landing page does not match a string', function() {
    var config = getConfig('http://foo.com/bar.html', false);
    expect(conditionDelegate(config)).toBe(false);
  });

  it('returns true when the landing page matches a regex', function() {
    var config = getConfig('Landingpage\\.com\\/t.st', true);
    expect(conditionDelegate(config)).toBe(true);
  });

  it('returns false when the landing page does not match a regex', function() {
    var config = getConfig('f.o', true);
    expect(conditionDelegate(config)).toBe(false);
  });
});
