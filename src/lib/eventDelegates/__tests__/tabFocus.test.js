'use strict';

var eventDelegateInjector = require('inject!../tabFocus');
var visibilityApi = require('../../resources/visibilityApi');
var visibilityApiInstance = visibilityApi();
var visibilityChangeListener;

var mockDocument = {
  location: 'somelocation',
  addEventListener: function(event, listener) {
    if (event && event === visibilityApiInstance.visibilityChangeEventType) {
      visibilityChangeListener = listener;
    }
  }
};

var publicRequire = require('../../__tests__/helpers/stubPublicRequire')({
  resourceStubs: {
    'dtm/resources/visibilityApi': visibilityApi
  }
});
var delegate = eventDelegateInjector({
  getExtension: publicRequire('getExtension'),
  once: publicRequire('once'),
  document: mockDocument
});


describe('tabfocus event type', function() {
  it('triggers rule when the tabfocus event occurs', function() {
    var trigger = jasmine.createSpy();

    delegate({}, trigger);

    expect(trigger.calls.count()).toBe(0);

    mockDocument[visibilityApiInstance.hiddenProperty] = false;
    visibilityChangeListener.call(location);

    expect(trigger.calls.count()).toBe(1);
    var call = trigger.calls.mostRecent();
    expect(call.args[0].type).toBe('tabfocus');
    expect(call.args[0].target).toBe(mockDocument);
    expect(call.args[1]).toBe(mockDocument.location);
  });
});