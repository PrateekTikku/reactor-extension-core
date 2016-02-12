'use strict';
var document = require('document');
var once = require('once');
var visibilityApi = require('getResource')('dtm', 'visibilityApi')();
var Timer = require('getResource')('dtm', 'timer');

var hiddenProperty = visibilityApi.hiddenProperty;
var visibilityChangeEventType = visibilityApi.visibilityChangeEventType;
var triggers = {};

var getPseudoEventType = function(timeOnPage) {
  return 'timepassed(' + timeOnPage + ')';
};

var getPseudoEvent = function(target, timeOnPage) {
  return {
    type: getPseudoEventType(timeOnPage),
    target: target,
    timeOnPage: timeOnPage
  };
};

var onMarkerPassed = function(timeOnPage) {
  triggers[timeOnPage].forEach(function(trigger) {
    trigger(getPseudoEvent(document, timeOnPage / 1000));
  });
};

var setupTimer = once(function() {
  var timer = new Timer();
  timer.on('markerPassed', onMarkerPassed);

  document.addEventListener(visibilityChangeEventType, function() {
    if (document[hiddenProperty]) {
      timer.pause();
    } else {
      timer.resume();
    }
  }, true);

  timer.start();
  return timer;
});

/**
 * Time spent on page event. The event is triggered by a timer. The timer receives a list of markers
 * that will be used trigger a callback method. The callback is called whenever the counted time
 * passes the provided markers. The timer will be paused whenever the user will switch to another
 * tab and it will be resumed when the user returns back to the tab.
 * @param {Object} config The event config object.
 * @param {ruleTrigger} trigger The trigger callback.
 */
module.exports = function(config, trigger) {
  var timer = setupTimer();
  var timeOnPageMilliseconds = config.timeOnPage * 1000;

  timer.addMarker(timeOnPageMilliseconds);

  if (!triggers[timeOnPageMilliseconds]) {
    triggers[timeOnPageMilliseconds] = [];
  }

  triggers[timeOnPageMilliseconds].push(trigger);
};
