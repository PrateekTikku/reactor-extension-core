'use strict';

var getObjectProperty = require('getObjectProperty');

/**
 * The variable data element.
 * @param {Object} settings The data element settings object.
 * @param {string} settings.path The global path to the variable holding the data element value.
 * @returns {string}
 */
module.exports = function(settings) {
  return getObjectProperty(window, settings.path);
};
