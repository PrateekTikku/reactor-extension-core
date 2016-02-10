'use strict';
var EventEmitter = require('EventEmitter');

var CHECK_INTERVAL_MS = 1000;
var onlyUnique = function (value, index, self) {
  return self.indexOf(value) === index;
};

/**
 * Track the time passed since an initial moment in time.
 *
 * @param {Number} [checkInterval] The interval (in milliseconds) at which the class will update
 * it's internal counter.
 * @constructor
 */
var Timer = function(checkInterval) {
  this._total = 0;
  this._checkInterval = checkInterval || CHECK_INTERVAL_MS;
  this._intervalId = null;

  this._markers = [];
};

Timer.prototype = {
  start: function() {
    this.resume();
  },

  resume: function() {
    this._setIntervalUpdater();
    this._startNewInternalTimer();
  },

  pause: function() {
    this._removeIntervalUpdater();
    this._calculateTimePassed();
    this._stopInternalTimer();
  },

  getTime: function() {
    return this._total;
  },

  addMarker: function(marker) {
    this._markers.push(marker);
    this._markers = this._markers.filter(onlyUnique);
    this._markers.sort();
  },

  _setIntervalUpdater: function() {
    this._intervalId =
      window.setInterval(this._calculateTimePassed.bind(this), this._checkInterval);
  },

  _removeIntervalUpdater: function() {
    window.clearInterval(this._intervalId);
  },

  _startNewInternalTimer: function() {
    this._startTime = new Date().getTime();
  },

  _stopInternalTimer: function() {
    this._startTime = null;
  },

  _calculateTimePassed: function() {
    this._total += new Date().getTime() - this._startTime;
    this._checkMarkersCompleted();
    this._startNewInternalTimer();
  },

  _checkMarkersCompleted: function() {
    var newMarkers = [];
    var timePassed =  this.getTime();

    for (var i = 0, l = this._markers.length; i < l; i++) {
      if (timePassed >= this._markers[i]) {
        this.trigger('markerPassed', this._markers[i]);
      } else {
        newMarkers.push(this._markers[i]);
      }
    }

    this._markers = newMarkers;
  }
};
EventEmitter.mixin(Timer);

module.exports = Timer;
