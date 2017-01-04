'use strict';

var getClickEvent = function() {
  var event;

  if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
    event = document.createEvent('MouseEvent');
    event.initMouseEvent(
      'click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null
    );
  } else {
    event = new MouseEvent('click');
  }

  return event;
};

describe('click event type', function() {
  var testStandardEvent = require('./helpers/testStandardEvent');

  var mockWindow = {};
  var propertySettings = {};

  var delegateInjector = require('inject!../click');
  var delegate = delegateInjector({
    '@turbine/property-settings': propertySettings,
    '@turbine/window': mockWindow
  });

  testStandardEvent(delegate, 'click');

  describe('delay link activation', function() {
    var INITIAL_LOCATION = 'http://clicktests.com/';
    var LINK_LOCATION = 'http://example.com/';
    var defaultPrevented;
    var link;

    // Regardless of what we're testing, we can't let a simulated link click take us away
    // from the testing page. However, we also need to record if the default was prevented by
    // the delegate so we can assert on it within the tests.
    var clickHandler = function(event) {
      defaultPrevented = event.defaultPrevented;
      event.preventDefault();
    };

    beforeAll(function() {
      jasmine.clock().install();
      document.addEventListener('click', clickHandler);
    });

    afterAll(function() {
      jasmine.clock().uninstall();
      document.removeEventListener('click', clickHandler);
    });

    beforeEach(function() {
      delete propertySettings.linkDelay;
      mockWindow.location = INITIAL_LOCATION;
      mockWindow.top = mockWindow;
      mockWindow.name = 'myWindow';

      defaultPrevented = false;

      link = document.createElement('a');
      link.href = 'http://example.com/';

      document.body.appendChild(link);
    });

    afterEach(function() {
      document.body.removeChild(link);

      // Without resetting between tests, the delegate would continue watching for and taking
      // action on click events from prior tests.
      delegate.__reset();
    });

    it('delays navigation by the default delay', function() {
      delegate({
        delayLinkActivation: true
      }, function() {});

      link.click();

      expect(defaultPrevented).toBe(true);
      jasmine.clock().tick(99);
      expect(mockWindow.location).toEqual(INITIAL_LOCATION);
      jasmine.clock().tick(1);
      expect(mockWindow.location).toEqual(LINK_LOCATION);
    });

    it('delays navigation by a custom delay', function() {
      propertySettings.linkDelay = 3000;
      delegate({
        delayLinkActivation: true
      }, function() {});

      link.click();

      expect(defaultPrevented).toBe(true);
      jasmine.clock().tick(2999);
      expect(mockWindow.location).toEqual(INITIAL_LOCATION);
      jasmine.clock().tick(1);
      expect(mockWindow.location).toEqual(LINK_LOCATION);
    });

    it('does not delay navigation if no related rule runs', function() {
      delegate({
        elementSelector: 'h2',
        delayLinkActivation: true
      }, function() {});

      link.click();

      expect(defaultPrevented).toBe(false);
    });

    it('does not delay navigation if the element clicked on is not a link', function() {
      delegate({
        delayLinkActivation: true
      }, function() {});

      document.body.click();

      expect(defaultPrevented).toBe(false);
    });

    it('does not delay navigation if the link does not have an href', function() {
      link.removeAttribute('href');

      delegate({
        delayLinkActivation: true
      }, function() {});

      link.click();

      expect(defaultPrevented).toBe(false);
    });

    it('does not delay navigation if the link has target=_blank', function() {
      link.setAttribute('target', '_blank');

      delegate({
        delayLinkActivation: true
      }, function() {});

      link.click();

      expect(defaultPrevented).toBe(false);
    });

    it('does not delay navigation if the link has target=_top and is within an iframe', function() {
      mockWindow.top = {};
      link.setAttribute('target', '_top');

      delegate({
        delayLinkActivation: true
      }, function() {});

      link.click();

      expect(defaultPrevented).toBe(false);
    });

    it('delays navigation if the link has target=_top and is not within an iframe', function() {
      link.setAttribute('target', '_top');

      delegate({
        delayLinkActivation: true
      }, function() {});

      link.click();

      expect(defaultPrevented).toBe(true);
    });

    it('does not delay navigation if the link has target=_parent', function() {
      link.setAttribute('target', '_parent');

      delegate({
        delayLinkActivation: true
      }, function() {});

      link.click();

      expect(defaultPrevented).toBe(false);
    });

    it('delays navigation if the link has a target that is the window name', function() {
      link.setAttribute('target', 'myWindow');

      delegate({
        delayLinkActivation: true
      }, function() {});

      link.click();

      expect(defaultPrevented).toBe(true);
    });

    it('delays navigation if the link has a target that is not equal the window name', function() {
      link.setAttribute('target', 'otherWindow');

      delegate({
        delayLinkActivation: true
      }, function() {});

      link.click();

      expect(defaultPrevented).toBe(false);
    });

    it('ignores the fake events generated by AppMeasurement', function() {
      var trigger = jasmine.createSpy();

      delegate({
        bubbleFireIfParent: true,
        bubbleFireIfChildFired: true
      }, trigger);

      var event = getClickEvent();
      event['s_fe'] = 1;
      document.body.dispatchEvent(event);

      expect(trigger.calls.count()).toBe(0);
    });
  });
});
