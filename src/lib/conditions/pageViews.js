'use strict';
var visitorTracking = require('../helpers/visitorTracking.js');
var compareNumbers = require('../helpers/compareNumbers.js');

// Visitor tracking should only run (be enabled) when a rule for the property contains a condition
// that needs it. The line below will be included in the emitted library if a rule requires this
// condition and it will be run regardless of whether the condition ever gets evaluated.
visitorTracking.enable();

/**
 * Enum for duration.
 * @readonly
 * @enum {string}
 */
var duration = {
  LIFETIME: 'lifetime',
  SESSION: 'session'
};

/**
 * Page views condition. Determines if the number of page views matches constraints.
 * @param {Object} settings Condition settings.
 * @param {comparisonOperator} settings.operator The comparison operator to use to
 * compare against count.
 * @param {number} settings.count The number of page views to compare against.
 * @param {duration} settings.duration The duration of time for which to include
 * page views.
 * @returns {boolean}
 */
module.exports = function(settings) {
  var methodName = settings.duration === duration.LIFETIME ?
    'getLifetimePageViewCount' : 'getSessionPageViewCount';
  return compareNumbers(
    visitorTracking[methodName](),
    settings.operator,
    settings.count
  );
};
