'use strict';

var conditionDelegateInjector = require('inject!../cookieOptOut');

var conditionDelegate;

var setCookie = require('@reactor/turbine/src/utils/cookie/setCookie');
var removeCookie = require('@reactor/turbine/src/utils/cookie/removeCookie');

var getConfig = function(acceptsCookies) {
  return {
    acceptsCookies: acceptsCookies
  };
};

describe('cookie opt-out condition delegate', function() {
  var runTests = function(customCookieName) {
    describe('with ' + customCookieName ? 'custom cookie name' : 'default cookie name', function() {
      var cookieName = 'sat_track';
      var mockPropertyConfig;

      beforeAll(function() {
        mockPropertyConfig = {};

        if (customCookieName) {
          mockPropertyConfig.euCookieName = customCookieName;
          cookieName = customCookieName;
        } else {
          delete mockPropertyConfig.euCookieName;
        }

        var publicRequire = require('../../__tests__/helpers/stubPublicRequire')({
          propertyConfig: mockPropertyConfig
        });

        conditionDelegate = conditionDelegateInjector({
          propertyConfig: publicRequire('propertyConfig'),
          getCookie: publicRequire('getCookie')
        });
      });

      it('returns true when the cookie is set to "true" and acceptsCookies is true', function() {
        setCookie(cookieName, 'true');
        var config = getConfig(true);
        expect(conditionDelegate(config)).toBe(true);
        removeCookie(cookieName);
      });

      it('returns false when the cookie is set to "false" and acceptsCookies is true', function() {
        setCookie(cookieName, 'false');
        var config = getConfig(true);
        expect(conditionDelegate(config)).toBe(false);
        removeCookie(cookieName);
      });

      it('returns false when the cookie is set to "true" and acceptsCookies is false', function() {
        setCookie(cookieName, 'true');
        var config = getConfig(false);
        expect(conditionDelegate(config)).toBe(false);
        removeCookie(cookieName);
      });

      it('returns true when the cookie is set to "false" and acceptsCookies is false', function() {
        setCookie(cookieName, 'false');
        var config = getConfig(false);
        expect(conditionDelegate(config)).toBe(true);
        removeCookie(cookieName);
      });

      it('returns false when the cookie has not been set and acceptsCookies is true', function() {
        var config = getConfig(true);
        expect(conditionDelegate(config)).toBe(false);
      });

      it('returns false when the cookie has not been set and acceptsCookies is false', function() {
        var config = getConfig(false);
        expect(conditionDelegate(config)).toBe(false);
      });
    });
  };

  runTests();
  runTests('sat_custom_track');
});
