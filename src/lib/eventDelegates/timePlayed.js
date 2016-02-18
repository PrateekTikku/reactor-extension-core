'use strict';

var extension = require('getExtension')('dtm');
var bubbly = extension.getResource('createBubbly')();
var dataStash = require('createDataStash')('timePlayed');

var relevantMarkers = [];

/**
 * Unit string values.
 * @enum {string}
 */
var timePlayedUnit = {
  SECOND: 'second',
  PERCENT: 'percent'
};

var getPseudoEventType = function(amount, unit) {
  var unitSuffix = unit === timePlayedUnit.SECOND ? 's' : '%';
  return 'videoplayed(' + amount + unitSuffix + ')';
};

var getPseudoEvent = function(amount, unit, target) {
  return {
    type: getPseudoEventType(amount, unit),
    target: target,
    amount: amount,
    unit: unit
  };
};

var handleTimeUpdate = function(event) {
  var target = event.target;

  if (!target.seekable || !target.seekable.length) {
    return;
  }

  var seekable = target.seekable;
  var startTime = seekable.start(0);
  var endTime = seekable.end(0);
  var currentTime = target.currentTime;
  var playedSeconds = currentTime - startTime;
  var targetDataStash = dataStash(target);

  var secondsLastTriggered = targetDataStash.lastTriggered || 0;
  var pseudoEvent;

  relevantMarkers.forEach(function(relevantMarker) {
    var configuredSeconds = relevantMarker.unit === timePlayedUnit.SECOND ?
      relevantMarker.amount : (endTime - startTime) * (relevantMarker.amount / 100);
    if (configuredSeconds > secondsLastTriggered && configuredSeconds <= playedSeconds) {
      pseudoEvent = getPseudoEvent(relevantMarker.amount, relevantMarker.unit, target);
      bubbly.evaluateEvent(pseudoEvent);
    }
  });

  targetDataStash.lastTriggered = playedSeconds;
};

document.addEventListener('timeupdate', handleTimeUpdate, true);

/**
 * The time played event. This event occurs when the media has been played for a specified amount
 * of time.
 * @param {Object} settings The event settings object.
 * @param {string} [settings.elementSelector] The CSS selector the element must match in order for
 * the rule to fire.
 * @param {Object[]} [settings.elementProperties] Property values the element must have in order
 * for the rule to fire.
 * @param {string} settings.elementProperties[].name The property name.
 * @param {string} settings.elementProperties[].value The property value.
 * @param {boolean} [settings.elementProperties[].valueIsRegex=false] Whether <code>value</code>
 * on the object instance is intended to be a regular expression.
 * @param {number} settings.amount The amount of time the media must be played before
 * this event is fired. This value may either be number of seconds (20 for 20 seconds) or a
 * percent value (20 for 20%).
 * @param {timePlayedUnit} settings.unit The unit of duration measurement.
 * @param {boolean} [settings.bubbleFireIfParent=false] Whether the rule should fire if
 * the event originated from a descendant element.
 * @param {boolean} [settings.bubbleFireIfChildFired=false] Whether the rule should fire
 * if the same event has already triggered a rule targeting a descendant element.
 * @param {boolean} [settings.bubbleStop=false] Whether the event should not trigger
 * rules on ancestor elements.
 * @param {ruleTrigger} trigger The trigger callback.
 */
module.exports = function(settings, trigger) {
  var doesMarkerMatch = function(marker) {
    return marker.amount === settings.amount && marker.unit === settings.unit;
  };

  var markerRegistered = relevantMarkers.some(doesMarkerMatch);

  if (!markerRegistered) {
    relevantMarkers.push({
      amount: settings.amount,
      unit: settings.unit
    });
  }

  var pseudoEventType = getPseudoEventType(settings.amount, settings.unit);

  bubbly.addListener(settings, function(event, relatedElement) {
    // Bubbling for this event is dependent upon the amount and unit configured for rules.
    // An event can "bubble up" to other rules with the same amount and unit but not to rules with
    // a different amount or unit. See the tests for how this plays out.
    if (event.type === pseudoEventType) {
      trigger(event, relatedElement);
    } else {
      return false;
    }
  });
};
