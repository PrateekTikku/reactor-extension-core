'use strict';
var window = require('window');

var getObjectProperty = require('../helpers/getObjectProperty.js');
var textMatch = require('../helpers/textMatch.js');

/**
 * Variable condition. Determines if a particular JS variable's actual value matches
 * an acceptable value.
 * @param {Object} settings Condition settings.
 * @param {number} settings.name The name of the JS variable (e.g., event.target.id).
 * @param {string} settings.value An acceptable JS variable value.
 * @param {boolean} [settings.valueIsRegex=false] Whether <code>settings.value</code> is intended to
 * be a regular expression.
 * @returns {boolean}
 */
module.exports = function(settings) {
  var acceptableValue = settings.valueIsRegex ? new RegExp(settings.value, 'i') : settings.value;
  var variable = settings.name;

  if (variable.substring(0, 7) === 'window.') {
    variable = variable.slice(7);
  }

  return textMatch(getObjectProperty(window, variable), acceptableValue);
};
