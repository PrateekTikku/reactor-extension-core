'use strict';

var mockVisitorTracking = {
  getLifetimePageViewCount: jasmine.createSpy().and.callFake(function() {
    return 5;
  }),
  getSessionPageViewCount: jasmine.createSpy().and.callFake(function() {
    return 5;
  }),
  enable: jasmine.createSpy()
};

var conditionDelegateInjector = require('inject!../pageViews');

var conditionDelegate = conditionDelegateInjector({
  '../helpers/visitorTracking.js': mockVisitorTracking
});

var DURATIONS = [
  'lifetime',
  'session'
];

var getSettings = function(count, operator, duration) {
  return {
    count: count,
    operator: operator,
    duration: duration
  };
};

describe('page views condition delegate', function() {
  beforeEach(function() {
    mockVisitorTracking.getLifetimePageViewCount.calls.reset();
    mockVisitorTracking.getSessionPageViewCount.calls.reset();
  });

  it('calls visitorTracking.enable', function() {
    expect(mockVisitorTracking.enable).toHaveBeenCalled();
  });

  DURATIONS.forEach(function(duration) {
    describe('with "' + duration + '" duration', function() {
      // Make sure we're calling the correct method with respect to duration.
      var assertCorrectMethodCall = function() {
        var lifetimeCallCount = mockVisitorTracking.getLifetimePageViewCount.calls.count();
        var sessionCallCount = mockVisitorTracking.getSessionPageViewCount.calls.count();
        expect(lifetimeCallCount).toBe(duration === 'lifetime' ? 1 : 0);
        expect(sessionCallCount).toBe(duration === 'session' ? 1 : 0);
      };

      it('returns true when number of page views is above "greater than" constraint', function() {
        var settings = getSettings(4, '>', duration);
        expect(conditionDelegate(settings)).toBe(true);
        assertCorrectMethodCall();
      });

      it('returns false when number of page views is below "greater than" constraint', function() {
        var settings = getSettings(6, '>', duration);
        expect(conditionDelegate(settings)).toBe(false);
        assertCorrectMethodCall();
      });

      it('returns true when number of page views is below "less than" constraint', function() {
        var settings = getSettings(6, '<', duration);
        expect(conditionDelegate(settings)).toBe(true);
        assertCorrectMethodCall();
      });

      it('returns false when number of page views is above "less than" constraint', function() {
        var settings = getSettings(4, '<', duration);
        expect(conditionDelegate(settings)).toBe(false);
        assertCorrectMethodCall();
      });

      it('returns true when number of page views matches "equals" constraint', function() {
        var settings = getSettings(5, '=', duration);
        expect(conditionDelegate(settings)).toBe(true);
        assertCorrectMethodCall();
      });

      it('returns false when number of page views does not match "equals" constraint', function() {
        var settings = getSettings(11, '=', duration);
        expect(conditionDelegate(settings)).toBe(false);
        assertCorrectMethodCall();
      });
    });
  });
});
