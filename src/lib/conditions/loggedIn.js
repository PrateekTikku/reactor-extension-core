'use strict';

var getDataElement = require('get-data-element');

/**
 * Logged in condition. Determines if the user is logged in.
 * @param {Object} settings Condition settings.
 * @param {string} settings.dataElement The name of the data element identifying
 * whether the user is logged in.
 * @returns {boolean}
 */
module.exports = function(settings) {
  return Boolean(getDataElement(settings.dataElement, true));
};

