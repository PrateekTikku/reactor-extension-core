'use strict';

var outerElement;
var innerElement;

var assertTriggerCall = function(options) {
  expect(options.call.args[0].type).toBe(options.type);
  expect(options.call.args[0].target).toBe(options.target);
  expect(options.call.args[1]).toBe(options.relatedElement);
};

module.exports = function(delegate, type) {
  beforeAll(function() {
    outerElement = document.createElement('div');
    outerElement.id = 'outer';
    outerElement.title = 'outer container';

    innerElement = document.createElement('div');
    innerElement.id = 'inner';
    innerElement.title = 'inner container';
    outerElement.appendChild(innerElement);

    document.body.insertBefore(outerElement, document.body.firstChild);
  });

  afterAll(function() {
    document.body.removeChild(outerElement);
  });

  var simulateEvent = function() {
    // We're overloading our usage of Simulate here. The second arg is a character which only
    // applies for simulating keyboard events but doesn't really do anything in the case of
    // mouse events.
    Simulate[type](innerElement, 'A');
  };

  it('triggers rule when event occurs', function() {
    var trigger = jasmine.createSpy();

    delegate({
      selector: '#outer',
      elementProperties: {
        title: 'outer container'
      },
      bubbleFireIfParent: true
    }, trigger);

    simulateEvent();

    expect(trigger.calls.count()).toBe(1);

    assertTriggerCall({
      call: trigger.calls.mostRecent(),
      type: type,
      target: innerElement,
      relatedElement: outerElement
    });
  });

  it('does not trigger rule when selector does not match', function() {
    var trigger = jasmine.createSpy();

    delegate({
      selector: '#mismatch',
      elementProperties: {
        title: 'outer container'
      },
      bubbleFireIfParent: true
    }, trigger);

    simulateEvent();

    expect(trigger.calls.count()).toBe(0);
  });

  it('does not trigger rule when elementProperties does not match', function() {
    var trigger = jasmine.createSpy();

    delegate({
      selector: '#outer',
      elementProperties: {
        title: 'mismatch container'
      },
      bubbleFireIfParent: true
    }, trigger);

    simulateEvent();

    expect(trigger.calls.count()).toBe(0);
  });
};